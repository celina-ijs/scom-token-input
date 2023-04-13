import {
  customElements,
  ControlElement,
  customModule,
  Module,
  Styles,
  GridLayout,
  Label,
  Container,
  Input,
  Control,
  Panel,
  Button,
  Icon,
  application,
  HStack,
  IEventBus,
} from '@ijstech/components'
import {} from '@ijstech/eth-contract'
import customStyle, { buttonStyle, inputStyle, tokenSelectionStyle } from './index.css'
import { EventId, ITokenObject, IType } from './global/index'
import { getTokenBalance, limitDecimals } from './utils/index'
import { ChainNativeTokenByChainId, getChainId, isWalletConnected, tokenStore, assets } from '@scom/scom-token-list'
import { TokenSelect } from './tokenSelect'
import ScomTokenModal from '@scom/scom-token-modal'

interface ScomTokenInputElement extends ControlElement {
  type?: IType;
  title?: string;
  chainId?: number;
  token?: ITokenObject;
  readonly?: boolean;
  importable?: boolean;
  isSortBalanceShown?: boolean;
  isBtnMaxShown?: boolean;
  isCommonShown?: boolean;
  isInputShown?: boolean;
  isBalanceShown?: boolean;
  onChanged?: (target: Control, event: Event) => void;
  onSelectToken?: (token: ITokenObject|undefined) => void;
  onSetMaxBalance?: () => void;
}
const Theme = Styles.Theme.ThemeVars

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-token-input']: ScomTokenInputElement
    }
  }
}

@customModule
@customElements('i-scom-token-input')
export default class ScomTokenInput extends Module {
  private gridTokenInput: GridLayout
  private inputAmount: Input
  private lbBalance: Label
  private pnlTitle: HStack
  private pnlBalance: Panel
  private mdToken: ScomTokenModal
  private cbToken: TokenSelect
  private btnMax: Button
  private btnToken: Button

  private $eventBus: IEventBus;

  private _type: IType
  private _targetChainId: number
  private _token: ITokenObject
  private _title: string|Control
  private _isCommonShown: boolean = false
  private _isSortBalanceShown: boolean = true
  private _isBtnMaxShown: boolean = true
  private _readonly: boolean = false
  private _importable: boolean = false
  private _isInputShown: boolean = true
  private _isBalanceShown: boolean = true
  private tokenBalancesMap: any

  onChanged: (target: Control, event: Event) => void
  onSelectToken: (token: ITokenObject|undefined) => void;
  onSetMaxBalance: () => void

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.$eventBus =  application.EventBus;
    this.registerEvent();
  }

  static async create(options?: ScomTokenInputElement, parent?: Container) {
    let self = new this(parent, options);
    await self.ready();
    return self;
  }

  private onRefresh() {
    if (isWalletConnected()) {
      this.tokenBalancesMap = tokenStore.tokenBalances || {};
      if (this.token) {
        const _tokenList = tokenStore.getTokenList(this.chainId)
        const token = _tokenList.find(
          (t) =>
            (t.address && t.address == this.token?.address) ||
            t.symbol == this.token?.symbol
        )
        if (!token) this.token = undefined
        else this.token = token;
      }
    }
    this.renderTokenList();
    this.updateStatusButton();
  }

  private async onUpdateData() {
    this.tokenBalancesMap = await tokenStore.updateAllTokenBalances()
    this.onRefresh()
  }

  private async updateDataByNewToken() {
    this.tokenBalancesMap = tokenStore.tokenBalances || {}
    this.renderTokenList()
  }

  private registerEvent() {
     this.$eventBus.register(this, EventId.IsWalletConnected, this.onUpdateData)
     this.$eventBus.register(this, EventId.IsWalletDisconnected, this.onRefresh)
     this.$eventBus.register(this, EventId.chainChanged, this.onUpdateData)
     this.$eventBus.register(this, EventId.Paid, this.onUpdateData)
     this.$eventBus.register(this, EventId.EmitNewToken, this.updateDataByNewToken)
  }

  private get tokenDataList(): ITokenObject[] {
    // let tokenList: ITokenObject[] = this.tokenDataListProp?.length
    //   ? this.tokenDataListProp
    //   : tokenStore.getTokenList(this.chainId)
    let tokenList: ITokenObject[] = tokenStore.getTokenList(this.chainId);
    return tokenList.map((token: ITokenObject) => {
      const tokenObject = { ...token }
      const nativeToken = ChainNativeTokenByChainId[this.chainId]
      if (token.symbol === nativeToken.symbol) {
        Object.assign(tokenObject, { isNative: true })
      }
      if (!isWalletConnected()) {
        Object.assign(tokenObject, { balance: 0 })
      } else if (this.tokenBalancesMap && this.chainId === getChainId()) {
        Object.assign(tokenObject, {
          balance:
            this.tokenBalancesMap[
              token.address?.toLowerCase() || token.symbol
            ] || 0,
        })
      }
      return tokenObject
    })
    .sort(this.sortToken)
  }

  private sortToken = (a: any, b: any, asc?: boolean) => {
    if (a.balance != b.balance) {
      return asc ? a.balance - b.balance : b.balance - a.balance
    }
    if (a.symbol.toLowerCase() < b.symbol.toLowerCase()) {
      return -1
    }
    if (a.symbol.toLowerCase() > b.symbol.toLowerCase()) {
      return 1
    }
    return 0
  }

  get type(): IType {
    return this._type ?? 'button'
  }
  set type(value: IType) {
    if (value === this._type) return
    this._type = value
    if (this.btnToken)
      this.btnToken.width = value === 'button' ? "auto" : '100%'
    this.onRefresh()
  }

  get title(): any {
    return this._title ?? ''
  }
  set title(value: string | Control) {
    this._title = value
    let labelEl: Control
    if (typeof value === 'string') {
      labelEl = new Label(undefined, {
        caption: value,
        font: { color: Theme.colors.primary.main, size: '1rem', bold: true },
      })
    } else {
      labelEl = value
    }
    if (!this.pnlTitle) this.pnlTitle = new HStack()
    this.pnlTitle.clearInnerHTML()
    this.pnlTitle.appendChild(labelEl)
  }

  get token() {
    return this._token;
  }
  set token(value: ITokenObject | undefined) {
    this._token = value;
    this.onSelectFn(value)
    if (this.cbToken)
      this.cbToken.token = value
    if (this.mdToken)
      this.mdToken.token = value
  }
  
  get targetChainId() {
    return this._targetChainId;
  }
  set targetChainId(value: number) {
    this._targetChainId = value;
    if (typeof value === 'number') {
      if (this.cbToken)
        this.cbToken.targetChainId = value
      if (this.mdToken)
        this.mdToken.targetChainId = value
    }
  }

  get chainId() {
    return this.targetChainId || getChainId();
  }

  get isCommonShown(): boolean {
    return this._isCommonShown;
  }
  set isCommonShown(value: boolean) {
    this._isCommonShown = value;
    if (this.mdToken)
      this.mdToken.isCommonShown = value;
  }

  get isSortBalanceShown(): boolean {
    return this._isSortBalanceShown;
  }
  set isSortBalanceShown(value: boolean) {
    this._isSortBalanceShown = value;
    if (this.mdToken)
      this.mdToken.isSortBalanceShown = value;
  }

  get isBtnMaxShown(): boolean {
    return this._isBtnMaxShown;
  }
  set isBtnMaxShown(value: boolean) {
    this._isBtnMaxShown = value;
    if (this.btnMax) this.btnMax.visible = value
  }

  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value: boolean) {
    this._readonly = value;
    if (this.btnToken) {
      this.btnToken.enabled = !value
      this.btnToken.rightIcon.visible = !value
    }
    if (this.btnMax)
      this.btnMax.enabled = !value
    if (this.inputAmount)
      this.inputAmount.readOnly = value;
  }

  get importable(): boolean {
    return this._importable;
  }
  set importable(value: boolean) {
    this._importable = value;
    if (this.mdToken)
      this.mdToken.importable = value;
  }

  get isInputShown(): boolean {
    return this._isInputShown;
  }
  set isInputShown(value: boolean) {
    this._isInputShown = value;
    if (this.inputAmount) {
      this.inputAmount.visible = value
      this.gridTokenInput.templateColumns = value ? ['50%', 'auto'] : ['auto']
    }
  }

  get isBalanceShown(): boolean {
    return this._isBalanceShown;
  }
  set isBalanceShown(value: boolean) {
    this._isBalanceShown = value;
    if (this.pnlBalance) this.pnlBalance.visible = value
  }

  async onSetMax() {
    this.inputAmount.value = this.token ?
      limitDecimals(await getTokenBalance(this.token), this.token.decimals || 18)
      : '';
    if (this.onSetMaxBalance) this.onSetMaxBalance();
  }

  private async onAmountChanged(target: Control, event: Event) {
    if (this.onChanged) this.onChanged(target, event)
  }

  private onToggleFocus(value: boolean) {
    value ?
      this.gridTokenInput.classList.add('focus-style') :
      this.gridTokenInput.classList.remove('focus-style')
  }

  _handleFocus(event: Event) {
    this.onToggleFocus(true)
    return super._handleFocus(event)
  }

  private async renderTokenList() {
    if (this.type === 'combobox') {
      if (!this.cbToken.isConnected)
        await this.cbToken.ready();
      this.cbToken.tokenList = [...this.tokenDataList]
    }
    else {
      this.mdToken.onRefresh()
    }
  }

  private updateStatusButton() {
    const status = isWalletConnected()
    const value = !this.readonly && status
    if (this.btnToken) {
      this.btnToken.enabled = value
    }
    if (this.btnMax) {
      this.btnMax.enabled = value
    }
  }

  private updateTokenButton(token?: ITokenObject) {
    if (!this.btnToken) return
    if (!token)
      token = (this.tokenDataList || []).find(
        (v: ITokenObject) =>
          (v.address && v.address == this.token?.address) ||
          v.symbol == this.token?.symbol
      )
    if (token) {
      const tokenIconPath = assets.tokenPath(token, this.chainId)
      this.btnToken.caption = `<i-hstack verticalAlignment="center" gap="0.5rem">
          <i-panel>
            <i-image width=${24} height=${24} url="${tokenIconPath}" fallbackUrl="${assets.fallbackUrl}"></i-image>
          </i-panel>
          <i-label caption="${token?.symbol || ''}"></i-label>
        </i-hstack>`
      this.btnMax.visible = this.isBtnMaxShown
    } else {
      this.btnToken.caption = 'Select a token'
      this.btnMax.visible = false
    }
  }

  private onButtonClicked() {
    if (this.type === 'combobox')
      this.cbToken.showModal()
    else
      this.mdToken.showModal()
  }

  private async onSelectFn(token: ITokenObject|undefined) {
    this._token = token;
    if (!this.inputAmount.isConnected) {
      await this.inputAmount.ready()
      this.inputAmount.value = ''
    }
    if (token) {
      const symbol = token?.symbol || ''
      this.lbBalance.caption = `${(await getTokenBalance(token)).toFixed(2)} ${symbol}`
    } else {
      this.lbBalance.caption = '0.00'
    }
    this.updateTokenButton(token)
    if (this.onSelectToken) this.onSelectToken(token)
  }

  init() {
    this.classList.add(customStyle)
    super.init()
    this.onChanged = this.getAttribute('onChanged', true) || this.onChanged
    this.onSetMaxBalance = this.getAttribute('onSetMaxBalance', true) || this.onSetMaxBalance
    this.onSelectToken = this.getAttribute('onSelectToken', true) || this.onSelectToken
    this.title = this.getAttribute('title', true, '')
    const token = this.getAttribute('token', true)
    if (token) this.token = token
    this.targetChainId = this.getAttribute('chainId', true)
    this.readonly = this.getAttribute('readonly', true, false)
    this.isBtnMaxShown = this.getAttribute('isBtnMaxShown', true, true)
    this.type = this.getAttribute('type', true, 'button')
    if (this.type === 'button') {
      this.isCommonShown = this.getAttribute('isCommonShown', true, false)
      this.isSortBalanceShown = this.getAttribute('isSortBalanceShown', true, true)
      this.importable = this.getAttribute('importable', true, false)
    }
    this.isInputShown = this.getAttribute('isInputShown', true, true)
    this.isBalanceShown = this.getAttribute('isBalanceShown', true, true)

    document.addEventListener('click', (event) => {
      const target = event.target as Control
      const tokenInput = target.closest('#gridTokenInput')
      if (!tokenInput || !tokenInput.isSameNode(this.gridTokenInput))
        this.onToggleFocus(false)
      else
        this.onToggleFocus(true)
    })
  }

  render() {
    return (
      <i-panel width='100%'>
        <i-vstack gap='0.5rem'>
          <i-hstack
            horizontalAlignment='space-between'
            verticalAlignment='center'
            gap='0.5rem'
          >
            <i-hstack id="pnlTitle" gap="4px"></i-hstack>
            <i-hstack
              id="pnlBalance"
              horizontalAlignment='end'
              verticalAlignment='center'
              gap='0.5rem'
              opacity={0.6}
            >
              <i-label caption='Balance:' font={{ size: '0.875rem' }}></i-label>
              <i-label id='lbBalance' font={{ size: '0.875rem' }} caption="0"></i-label>
            </i-hstack>
          </i-hstack>
          <i-grid-layout
            id='gridTokenInput'
            templateColumns={['50%', 'auto']}
            background={{ color: Theme.input.background }}
            font={{ color: Theme.input.fontColor }}
            verticalAlignment='center'
            lineHeight={1.5715}
            padding={{ top: 4, bottom: 4, left: 11, right: 11 }}
            gap={{column: '0.5rem'}}
          >
            <i-input
              id='inputAmount'
              width='100%'
              height='100%'
              minHeight={34}
              class={inputStyle}
              inputType='number'
              font={{ size: '0.875rem' }}
              placeholder='Enter an amount'
              onChanged={this.onAmountChanged.bind(this)}
            ></i-input>
            <i-panel id="pnlSelection" width='100%' class={tokenSelectionStyle}>
              <i-hstack verticalAlignment="center" horizontalAlignment="end" gap="0.25rem">
                <i-button
                  id='btnMax'
                  visible={false}
                  caption='Max'
                  height='100%'
                  background={{ color: Theme.colors.success.main }}
                  font={{ color: Theme.colors.success.contrastText }}
                  padding={{
                    top: '0.25rem',
                    bottom: '0.25rem',
                    left: '0.5rem',
                    right: '0.5rem',
                  }}
                  onClick={() => this.onSetMax()}
                />
                <i-button
                  id='btnToken'
                  class={`${buttonStyle}`}
                  height='100%'
                  caption='Select a token'
                  rightIcon={{ width: 14, height: 14, name: 'angle-down' }}
                  border={{ radius: 0 }}
                  background={{ color: 'transparent' }}
                  font={{ color: Theme.input.fontColor }}
                  padding={{
                    top: '0.25rem',
                    bottom: '0.25rem',
                    left: '0.5rem',
                    right: '0.5rem',
                  }}
                  onClick={this.onButtonClicked.bind(this)}
                ></i-button>
              </i-hstack>
              <token-select
                id="cbToken"
                width='100%'
                onSelectToken={this.onSelectFn.bind(this)}
              ></token-select>
              <i-scom-token-modal
                id="mdToken"
                width='100%'
                onSelectToken={this.onSelectFn.bind(this)}
              ></i-scom-token-modal>
            </i-panel>
          </i-grid-layout>
        </i-vstack>
      </i-panel>
    )
  }
}
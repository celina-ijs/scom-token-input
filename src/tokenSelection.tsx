import {
  customElements,
  Module,
  Control,
  ControlElement,
  Modal,
  Input,
  Icon,
  Panel,
  Button,
  observable,
  application,
  IEventBus,
  Container,
  Styles,
  GridLayout,
  HStack,
  Label,
} from '@ijstech/components'
import {
  ChainNativeTokenByChainId,
  hasMetaMask,
  hasUserToken,
  setUserTokens,
  tokenStore,
  getChainId,
  isWalletConnected,
} from './store/index'
import { ITokenObject, EventId, IType } from './global/index'
import { formatNumber } from './utils/index'
import Assets from './assets'
import './tokenSelection.css'
import { ImportToken } from './importToken'
import { Contracts, Wallet } from '@ijstech/eth-wallet'
import customStyle, {
  buttonStyle,
  tokenStyle,
  scrollbarStyle,
  modalStyle,
} from './tokenSelection.css'
const Theme = Styles.Theme.ThemeVars

interface TokenSelectionElement extends ControlElement {
  // chainId?: number;
  // token?: ITokenObject;
  // readonly?: boolean;
  // importable?: boolean;
  // isSortBalanceShown?: boolean;
  // isBtnMaxShown?: boolean;
  // isCommonShown?: boolean;
  onSelectToken?: (token: ITokenObject) => void
  onSetMaxBalance?: () => void
}

declare const window: any

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['token-selection']: TokenSelectionElement
    }
  }
}

@customElements('token-selection')
export class TokenSelection extends Module {
  private _token?: ITokenObject
  private _targetChainId: number
  private _tokenDataListProp: Array<ITokenObject>
  private _isCommonShown: boolean
  private _isSortBalanceShown: boolean = true
  private tokenBalancesMap: any
  private fallbackUrl: string = Assets.fullPath('img/tokens/Custom.png')
  private _title: string | Control = 'Select Token'
  private _type: IType = 'button'

  private mdTokenSelection: Modal
  private btnToken: Button
  private btnMax: Button
  private gridTokenList: GridLayout
  private gridCommonToken: GridLayout
  private pnlCommonToken: Panel
  private pnlSortBalance: Panel
  private mdImportToken: ImportToken
  private titleStack: HStack
  private pnlSelection: Panel
  @observable()
  private sortValue: boolean | undefined
  private iconSortUp: Icon
  private iconSortDown: Icon
  private inputSearch: Input
  @observable()
  private filterValue: string
  private checkHasMetaMask: boolean
  private $eventBus: IEventBus
  private _readonly: boolean
  private _disabledMaxBtn: boolean
  private _importable: boolean
  private _isBtnMaxShown: boolean

  onSelectToken: (token: ITokenObject) => void
  onSetMaxBalance: () => void

  constructor(parent?: Container, options?: any) {
    super(parent, options)
    this.$eventBus = application.EventBus
    this.registerEvent()
  }

  get token() {
    return this._token
  }
  set token(value: ITokenObject | undefined) {
    this._token = value
    this.updateTokenButton(value)
    if (this.onSelectToken)
      this.onSelectToken(this.token)
  }

  get targetChainId(): number {
    return this._targetChainId
  }
  set targetChainId(value: number) {
    this._targetChainId = value
    this.updateDataByChain()
  }

  get chainId(): number {
    return this.targetChainId || getChainId()
  }

  get tokenDataListProp(): Array<ITokenObject> {
    return this._tokenDataListProp
  }

  set tokenDataListProp(value: Array<ITokenObject>) {
    this._tokenDataListProp = value
    this.renderTokenList();
    this.updateTokenButton();
  }

  get isCommonShown(): boolean {
    return this._isCommonShown
  }
  set isCommonShown(value: boolean) {
    this._isCommonShown = value
    this.renderCommonItems()
  }

  get isSortBalanceShown(): boolean {
    return this._isSortBalanceShown
  }
  set isSortBalanceShown(value: boolean) {
    this._isSortBalanceShown = value
    if (this.pnlSortBalance)
      this.pnlSortBalance.visible = value
  }

  get readonly(): boolean {
    return this._readonly
  }
  set readonly(value: boolean) {
    this._readonly = value
    if (this.btnToken) {
      this.btnToken.enabled = !value
      this.btnToken.rightIcon.visible = !value
    }
    this.disabledMaxBtn = value
  }

  get disabledMaxBtn(): boolean {
    return this._disabledMaxBtn
  }
  set disabledMaxBtn(value: boolean) {
    this._disabledMaxBtn = value
    if (this.btnMax)
      this.btnMax.enabled = !value
  }

  get importable(): boolean {
    return this._importable
  }
  set importable(value: boolean) {
    this._importable = value
  }

  get isBtnMaxShown(): boolean {
    return this._isBtnMaxShown
  }
  set isBtnMaxShown(value: boolean) {
    this._isBtnMaxShown = value
    if (this.btnMax)
      this.btnMax.visible = value
  }

  get title(): any {
    return this._title
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
    if (!this.titleStack) this.titleStack = new HStack()
    this.titleStack.clearInnerHTML()
    this.titleStack.appendChild(labelEl)
  }

  get type() {
    return this._type || 'button'
  }
  set type(value: IType) {
    this._type = value || 'button'
    this.renderUI()
  }

  private async renderUI() {
    if (!this.gridTokenList)
      this.gridTokenList = (
        <i-grid-layout
          id='gridTokenList'
          width='100%'
          columnsPerRow={1}
          templateRows={['max-content']}
          class={`${this.type === 'button' ? ' is-button' : 'is-combobox'}`}
          gap={{ row: this.type === 'button' ? '0.5rem' : '0px' }}
        ></i-grid-layout>
      )
    this.type === 'button'
      ? await this.renderButton()
      : await this.renderCombobox()
    this.mdTokenSelection.classList.add(modalStyle)
    if (this.pnlSelection.contains(this.mdTokenSelection))
      this.pnlSelection.removeChild(this.mdTokenSelection)
    this.pnlSelection.appendChild(this.mdTokenSelection)
    this.onRefresh()
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

  private async renderButton() {
    this.mdTokenSelection = await Modal.create({
      width: 440,
      border: { radius: 8 },
      onClose: () => this.onCloseModal(),
      onOpen: () => this.onOpenModal(),
    })
    this.mdTokenSelection.item = (
      <i-panel>
        <i-hstack
          horizontalAlignment='space-between'
          padding={{ top: '0.25rem', bottom: '1rem' }}
          border={{
            bottom: { width: '2px', style: 'solid', color: Theme.divider },
          }}
          margin={{ bottom: '1rem' }}
        >
          <i-hstack id='titleStack' gap='4px'>
            <i-label
              caption='Select Token'
              font={{
                color: Theme.colors.primary.main,
                size: '1rem',
                bold: true,
              }}
            ></i-label>
          </i-hstack>
          <i-icon
            name='times'
            fill={Theme.colors.primary.main}
            width={16}
            height={16}
            onClick={this.closeModal.bind(this)}
            class='pointer'
          ></i-icon>
        </i-hstack>
        <i-panel margin={{ bottom: '1rem' }}>
          <i-icon
            width={16}
            height={16}
            name='search'
            fill={Theme.text.primary}
            position='absolute'
            left={10}
            top='50%'
            class='centered'
          />
          <i-input
            id='inputSearch'
            placeholder='Search name or paste address'
            width='100%'
            height='auto'
            border={{
              radius: '0.5rem',
              width: '1px',
              style: 'solid',
              color: Theme.divider,
            }}
            class='search-input'
            onKeyUp={this.onSearch.bind(this)}
          ></i-input>
        </i-panel>
        <i-panel id='pnlCommonToken' margin={{top: '0.5rem', bottom: '0.5rem'}}>
          <i-label caption='Common Token' />
          <i-grid-layout
            id='gridCommonToken'
            columnsPerRow={4}
            gap={{ row: '1rem', column: '1rem' }}
            verticalAlignment='center'
          ></i-grid-layout>
        </i-panel>
        <i-hstack
          id='pnlSortBalance'
          horizontalAlignment='space-between'
          verticalAlignment='center'
          class='sort-panel'
          visible={this.isSortBalanceShown}
        >
          <i-label
            caption='Token'
            font={{ color: Theme.colors.primary.main }}
          />
          <i-panel margin={{ left: 'auto' }} onClick={() => this.sortBalance()}>
            <i-label
              caption='Balance'
              margin={{ right: '1rem' }}
              font={{ color: Theme.colors.primary.main }}
            />
            <i-icon id='iconSortUp' class='icon-sort-up' name='sort-up' />
            <i-icon id='iconSortDown' class='icon-sort-down' name='sort-down' />
          </i-panel>
        </i-hstack>
        {this.gridTokenList}
      </i-panel>
    )
    this.btnToken.width = "auto"
  }

  private async renderCombobox() {
    this.mdTokenSelection = await Modal.create({
      showBackdrop: false,
      width: '100%',
      popupPlacement: 'bottom',
    })
    this.mdTokenSelection.classList.add('full-width', 'box-shadow')
    this.mdTokenSelection.item = (
      <i-panel
        margin={{ top: '0.25rem' }}
        padding={{ top: 5, bottom: 5 }}
        overflow={{ y: 'auto', x: 'hidden' }}
        maxWidth='100%'
        maxHeight={300}
        border={{ radius: 2 }}
        class={scrollbarStyle}
      >
        {this.gridTokenList}
      </i-panel>
    )
    this.btnToken.width = "100%"
  }

  private async updateDataByChain() {
    this.tokenBalancesMap = await tokenStore.updateAllTokenBalances()
    this.onRefresh()
  }

  private async updateDataByNewToken() {
    this.tokenBalancesMap = tokenStore.tokenBalances || {}
    this.renderTokenList()
  }

  private async onWalletConnect() {
    this.checkHasMetaMask = hasMetaMask()
    this.tokenBalancesMap = await tokenStore.updateAllTokenBalances()
    this.onRefresh()
  }

  private async onWalletDisconnect() {
    this.onRefresh()
  }

  private async onPaid() {
    await this.updateDataByChain()
    this.onRefresh()
  }

  private registerEvent() {
    this.$eventBus.register(
      this,
      EventId.IsWalletConnected,
      this.onWalletConnect
    )
    this.$eventBus.register(
      this,
      EventId.IsWalletDisconnected,
      this.onWalletDisconnect
    )
    this.$eventBus.register(this, EventId.chainChanged, this.updateDataByChain)
    this.$eventBus.register(this, EventId.Paid, this.onPaid)
    this.$eventBus.register(
      this,
      EventId.EmitNewToken,
      this.updateDataByNewToken
    )
  }

  private get tokenDataList(): ITokenObject[] {
    let tokenList: ITokenObject[] = this.tokenDataListProp?.length
      ? this.tokenDataListProp
      : tokenStore.getTokenList(this.chainId)
    return tokenList
      .map((token: ITokenObject) => {
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

  private get commonTokenDataList(): ITokenObject[] {
    const tokenList: ITokenObject[] = this.tokenDataList
    if (!tokenList) return []
    return tokenList.filter(
      (token: ITokenObject) => token.isCommon || token.isNative
    )
  }

  private get tokenDataListFiltered(): ITokenObject[] {
    let tokenList: ITokenObject[] = this.tokenDataList || []
    if (tokenList.length) {
      if (this.filterValue) {
        tokenList = tokenList.filter((token: ITokenObject) => {
          return (
            token.symbol.toUpperCase().includes(this.filterValue) ||
            token.name.toUpperCase().includes(this.filterValue) ||
            token.address?.toUpperCase() === this.filterValue
          )
        })
      }
      if (this.sortValue !== undefined) {
        tokenList = tokenList.sort((a: ITokenObject, b: ITokenObject) => {
          return this.sortToken(a, b, this.sortValue)
        })
        const allBalanceZero = !tokenList.some(
          (token: ITokenObject) => token.balance && token.balance !== '0'
        )
        if (allBalanceZero && !this.sortValue) {
          tokenList = tokenList.reverse()
        }
      }
    }
    return tokenList
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

  private sortBalance() {
    this.sortValue = !this.sortValue
    if (this.sortValue) {
      this.iconSortUp.classList.add('icon-sorted')
      this.iconSortDown.classList.remove('icon-sorted')
    } else {
      this.iconSortUp.classList.remove('icon-sorted')
      this.iconSortDown.classList.add('icon-sorted')
    }
    this.renderTokenList()
  }

  private onSearch(source: Control) {
    const value = (source as Input).value.toUpperCase()
    if (this.filterValue === value) return
    this.filterValue = (source as Input).value.toUpperCase()
    this.renderTokenList()
  }

  private async renderCommonItems() {
    if (!this.gridCommonToken) return
    this.gridCommonToken.innerHTML = ''
    if (this.isCommonShown && this.commonTokenDataList) {
      this.pnlCommonToken.visible = true
      this.commonTokenDataList.forEach((token: ITokenObject) => {
        const tokenIconPath = Assets.tokenPath(token, this.chainId)
        this.gridCommonToken.appendChild(
          <i-hstack
            background={{ color: Theme.background.default }}
            onClick={(target: Control) => this.onSelect(target, token)}
            tooltip={{ content: token.name }}
            verticalAlignment='center'
            padding={{top: '0.35rem', bottom: '0.35rem', left: '0.5rem', right: '0.5rem'}}
            border={{radius: '1rem', width: '1px', style: 'solid', color: 'transparent'}}
            gap="0.5rem" class='token-item common-token pointer'
          >
            <i-image
              width={24}
              height={24}
              url={tokenIconPath}
              fallbackUrl={this.fallbackUrl}
            />
            <i-label caption={token.symbol}></i-label>
          </i-hstack>
        )
      })
    } else {
      this.pnlCommonToken.visible = false
    }
  }

  private renderToken(token: ITokenObject) {
    const tokenIconPath = Assets.tokenPath(token, this.chainId)
    const isActive = this.token && token.address === this.token.address;
    const tokenElm = (
      <i-hstack
        width='100%'
        class={`pointer token-item ${tokenStyle} ${isActive ? ' is-selected' : ''}`}
        verticalAlignment='center'
        padding={
          this.type === 'button'
            ? {
                top: '0.5rem',
                bottom: '0.5rem',
                left: '0.75rem',
                right: '0.75rem',
              }
            : { top: 5, bottom: 5, left: '0.75rem', right: '0.75rem' }
        }
        border={{ radius: this.type === 'button' ? 5 : '0px' }}
        gap='0.5rem'
        onClick={(target: Control) => this.onSelect(target, token)}
      >
        <i-vstack width='100%'>
          <i-hstack gap='0.5rem' verticalAlignment='center'>
            <i-hstack
              gap='0.5rem'
              verticalAlignment={this.type === 'button' ? 'start' : 'center'}
            >
              <i-image
                width={24}
                height={24}
                url={tokenIconPath}
                fallbackUrl={this.fallbackUrl}
              />
              <i-panel>
                <i-label class="token-symbol" caption={token.symbol} font={{bold: this.type === 'button'}} />
                <i-hstack
                  visible={this.type === 'button'}
                  verticalAlignment='center'
                  gap='0.5rem'
                >
                  <i-label caption={token.name} />
                  {token.address && !token.isNative ? (
                    <i-icon
                      name='copy'
                      width='14px'
                      height='14px'
                      display='inline-flex'
                      fill={Theme.text.primary}
                      tooltip={{
                        content: `${token.symbol} has been copied`,
                        trigger: 'click',
                      }}
                      onClick={() => application.copyToClipboard(token.address || '')}
                    ></i-icon>
                  ) : (
                    []
                  )}
                  {token.address && this.checkHasMetaMask ? (
                    <i-image
                      display='flex'
                      width={16}
                      height={16}
                      url={Assets.fullPath('img/metamask.png')}
                      tooltip={{ content: 'Add to MetaMask' }}
                      onClick={(target: Control, event: Event) => this.addToMetamask(event, token)}                      
                    ></i-image>
                  ) : (
                    []
                  )}
                </i-hstack>
              </i-panel>
            </i-hstack>
            <i-label
              visible={this.type === 'button'}
              margin={{ left: 'auto' }}
              caption={formatNumber(token.balance, 4)}
            />
          </i-hstack>
          {token.isNew ? (
            <i-hstack horizontalAlignment='center'>
              <i-button
                caption='Import'
                class='btn-import'
                margin={{ top: 10 }}
                height={34}
                onClick={(source: Control, event: Event) =>
                  this.showImportTokenModal(tokenElm, event, token)
                }
              ></i-button>
            </i-hstack>
          ) : (
            []
          )}
        </i-vstack>
      </i-hstack>
    )
    return tokenElm;
  }

  private getTokenObject = async (address: string, showBalance?: boolean) => {
    const ERC20Contract = new Contracts.ERC20(
      Wallet.getClientInstance() as any,
      address
    )
    const symbol = await ERC20Contract.symbol()
    const name = await ERC20Contract.name()
    const decimals = (await ERC20Contract.decimals()).toFixed()
    let balance: any
    if (showBalance && isWalletConnected()) {
      balance = (
        await ERC20Contract.balanceOf(
          Wallet.getClientInstance().account.address
        )
      )
        .shiftedBy(-decimals)
        .toFixed()
    }
    return {
      address: address.toLowerCase(),
      decimals: +decimals,
      name,
      symbol,
      balance,
    }
  }

  private clearTokenList() {
    this.gridTokenList.clearInnerHTML()
    this.gridTokenList.append(
      <i-label
        class='text-center'
        caption='No tokens found'
        margin={{ top: '1rem', bottom: '1rem' }}
      />
    )
  }

  private async renderTokenList() {
    if (!this.gridTokenList) return
    this.renderCommonItems()
    this.gridTokenList.clearInnerHTML()
    if (this.tokenDataListFiltered.length) {
      const tokenItems = this.tokenDataListFiltered.map((token: ITokenObject) =>
        this.renderToken(token)
      )
      this.gridTokenList.append(...tokenItems)
    } else if (
      !this.importable ||
      (this.targetChainId && this.targetChainId !== getChainId())
    ) {
      this.clearTokenList()
    } else {
      try {
        const tokenObj = await this.getTokenObject(this.filterValue, true)
        if (!tokenObj) throw new Error('Token is invalid')
        this.gridTokenList.clearInnerHTML()
        this.gridTokenList.appendChild(
          this.renderToken({ ...tokenObj, isNew: true })
        )
      } catch (err) {
        this.clearTokenList()
      }
    }
  }

  private addToMetamask(event: Event, token: ITokenObject) {
    event.stopPropagation()
    const tokenIconPath = Assets.tokenPath(token, this.chainId)
    const img = `${window.location.origin}${tokenIconPath.substring(1)}`
    window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals,
          image: img,
        },
      },
    })
  }

  private async showModal() {
    if (!this.enabled) return
    if (this.type === 'button') {
      this.inputSearch.value = ''
      this.filterValue = ''
      this.sortValue = undefined
      this.iconSortUp.classList.remove('icon-sorted')
      this.iconSortDown.classList.remove('icon-sorted')
    }
    if (!this.gridTokenList.innerHTML) this.onRefresh()
    this.mdTokenSelection.visible = this.type === 'button' ? true : !this.mdTokenSelection.visible
    this.gridTokenList.scrollTop = 0
  }

  private updateStatusButton() {
    const status = isWalletConnected()
    if (this.btnToken) {
      this.btnToken.enabled = !this.readonly && status
    }
    if (this.btnMax) {
      this.btnMax.enabled = !this.disabledMaxBtn && status
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
      const tokenIconPath = Assets.tokenPath(token, this.chainId)
      if (this.type === 'button') {
        const icon = new Icon(this.btnToken, {
          width: 24,
          height: 24,
          image: {
            url: tokenIconPath,
            fallBackUrl: this.fallbackUrl,
          },
        })
        this.btnToken.icon = icon
        this.btnToken.caption = token.symbol
      } else {
        this.btnToken.caption = `<i-hstack verticalAlignment="center" gap="0.5rem">
          <i-panel>
            <i-image width=${24} height=${24} url="${tokenIconPath}" fallbackUrl="${this.fallbackUrl}"></i-image>
          </i-panel>
          <i-label caption="${token.symbol}"></i-label>
        </i-hstack>`
      }
      this.btnMax.visible = this.isBtnMaxShown
    } else {
      this.btnToken.icon = undefined
      this.btnToken.caption = 'Select a token'
      this.btnMax.visible = false
    }
  }

  private async onSelect(target: Control, token: ITokenObject, isNew: boolean = false) {
    this.token = token
    // The token has been not imported
    if (
      !isNew &&
      token.isNew &&
      !hasUserToken(token.address || '', this.chainId)
    ) {
      setUserTokens(token, this.chainId)
      tokenStore.updateTokenMapData()
      await tokenStore.updateAllTokenBalances()
      this.$eventBus.dispatch(EventId.EmitNewToken, token)
      isNew = true
    }
    this.onSelectToken({ ...token, isNew })
    this.mdTokenSelection.visible = false
    const tokens = this.querySelectorAll('.token-item')
    tokens.forEach(token => token.classList.remove('is-selected'))
    target.classList.add('is-selected')
  }

  async init() {
    this.classList.add(customStyle)
    await this.onWalletConnect()
    super.init()
    this.onSelectToken = this.getAttribute('onSelectToken', true) || this.onSelectToken
  }

  showImportTokenModal(target: Control, event: Event, token: ITokenObject) {
    event.stopPropagation()
    this.mdImportToken.token = token
    this.mdImportToken.showModal()
    this.mdImportToken.onUpdate = this.onImportToken.bind(this)
  }

  onImportToken(target: Control, token: ITokenObject) {
    this.onSelect(target, token, true)
  }

  onCloseModal() {
    this.filterValue = ''
    this.renderTokenList()
  }

  onOpenModal() {
    if (this._title) this.title = this._title
  }

  closeModal() {
    this.mdTokenSelection.visible = false
  }

  render() {
    return (
      <i-panel>
        <i-panel id='pnlSelection'>
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
              onClick={() => this.onSetMaxBalance()}
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
              onClick={this.showModal.bind(this)}
            ></i-button>
          </i-hstack>
        </i-panel>
        <import-token id='mdImportToken' />
      </i-panel>
    )
  }
}

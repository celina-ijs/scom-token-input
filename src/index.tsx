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
} from '@ijstech/components'
import {} from '@ijstech/eth-contract'
import customStyle, { inputStyle, tokenSelectionStyle } from './index.css'
import { ITokenObject, IType } from './global/index'
import { TokenSelection } from './tokenSelection'
import { getTokenBalance, limitDecimals } from './utils/index'

interface TokenElement extends ControlElement {
  type?: IType;
  title?: string;
  chainId?: number;
  token?: ITokenObject;
  readonly?: boolean;
  importable?: boolean;
  isSortBalanceShown?: boolean;
  isBtnMaxShown?: boolean;
  isCommonShown?: boolean;
  onChanged?: (target: Control, event: Event) => void;
  onSetMaxBalance?: () => void;
}
const Theme = Styles.Theme.ThemeVars

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-scom-token-input']: TokenElement
    }
  }
}

@customModule
@customElements('i-scom-token-input')
export default class ScomTokenInput extends Module {
  private tokenSelection: TokenSelection
  private gridTokenInput: GridLayout
  private inputAmount: Input
  private lbBalance: Label
  private lbTitle: Label

  private _type: IType
  private _chainId: number
  private _token: ITokenObject
  private _title: string
  private _isCommonShown: boolean = false
  private _isSortBalanceShown: boolean = true
  private _isBtnMaxShown: boolean = true
  private _readonly: boolean = false
  private _importable: boolean = false

  private _onChanged: (target: Control, event: Event) => void
  private _onSetMaxBalance: () => void

  constructor(parent?: Container, options?: any) {
    super(parent, options)
  }

  get type(): IType {
    return this._type
  }
  set type(value: IType) {
    if (value === this._type) return
    this._type = value
    this.tokenSelection.type = value
  }

  get title(): string {
    return this._title
  }
  set title(value: string) {
    this._title = value
    this.lbTitle.caption = value || ''
  }

  get token() {
    return this._token;
  }
  set token(value: ITokenObject | undefined) {
    this._token = value;
    this.tokenSelection.token = value
    value && this.onSelectToken(value)
  }
  
  get chainId() {
    return this._chainId;
  }
  set chainId(value: number) {
    this._chainId = value;
    if (typeof value === 'number')
      this.tokenSelection.targetChainId = value
  }

  get isCommonShown(): boolean {
    return this._isCommonShown;
  }
  set isCommonShown(value: boolean) {
    this._isCommonShown = value;
    this.tokenSelection.isCommonShown = value;
  }

  get isSortBalanceShown(): boolean {
    return this._isSortBalanceShown;
  }
  set isSortBalanceShown(value: boolean) {
    this._isSortBalanceShown = value;
    this.tokenSelection.isSortBalanceShown = value;
  }

  get isBtnMaxShown(): boolean {
    return this._isBtnMaxShown;
  }
  set isBtnMaxShown(value: boolean) {
    this._isBtnMaxShown = value;
    this.tokenSelection.isBtnMaxShown = value;
  }

  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value: boolean) {
    this._readonly = value;
    this.tokenSelection.readonly = value;
    if (this.inputAmount)
      this.inputAmount.readOnly = value;
  }

  get importable(): boolean {
    return this._importable;
  }
  set importable(value: boolean) {
    this._importable = value;
    this.tokenSelection.importable = value;
  }

  get onSetMaxBalance(): any {
    return this._onSetMaxBalance || this.onSetMax.bind(this);
  }
  set onSetMaxBalance(callback: any) {
    this._onSetMaxBalance = callback;
    if (this.tokenSelection)
      this.tokenSelection.onSetMaxBalance = () => {
        this.onSetMax();
        callback && callback();
      }
  }

  async onSetMax() {
    this.inputAmount.value = this.token ?
      limitDecimals(await getTokenBalance(this.token), this.token.decimals || 18)
      : '';
  }

  get onChanged(): any {
    return this._onChanged;
  }
  set onChanged(callback: any) {
    this._onChanged = callback;
  }

  private async onAmountChanged(target: Control, event: Event) {
    if (this.onChanged) this.onChanged(target, event)
  }

  private onToggleFocus(value: boolean) {
    value ?
      this.gridTokenInput.classList.add('focus-style') :
      this.gridTokenInput.classList.remove('focus-style')
  }

  private async onSelectToken(token: ITokenObject|undefined) {
    this._token = token;
    this.inputAmount.value = ''
    if (token) {
      const symbol = token?.symbol || ''
      this.lbBalance.caption = `${(await getTokenBalance(token)).toFixed(2)} ${symbol}`
    } else {
      this.lbBalance.caption = '0.00'
    }
  }

  _handleFocus(event: Event) {
    this.onToggleFocus(true)
    return super._handleFocus(event)
  }

  init() {
    this.classList.add(customStyle)
    super.init()
    this.onChanged = this.getAttribute('onChanged', true)
    this.onSetMaxBalance = this.getAttribute('onSetMaxBalance', true)
    this.title = this.getAttribute('title', true, '')
    const token = this.getAttribute('token', true)
    if (token) this.token = token
    this.chainId = this.getAttribute('chainId', true)
    this.readonly = this.getAttribute('readonly', true, false)
    this.isBtnMaxShown = this.getAttribute('isBtnMaxShown', true, true)
    const typeAttr = this.getAttribute('type', true, 'button')
    if (typeAttr) this.type = typeAttr
    if (this.type === 'button') {
      this.isCommonShown = this.getAttribute('isCommonShown', true, false)
      this.isSortBalanceShown = this.getAttribute('isSortBalanceShown', true, true)
      this.importable = this.getAttribute('importable', true, false)
    }
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
            <i-label id='lbTitle' font={{ size: '1.25rem' }}></i-label>
            <i-hstack
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
            border={{
              radius: 6,
              width: '1px',
              style: 'solid',
              color: Theme.divider,
            }}
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
            <token-selection
              id='tokenSelection'
              class={tokenSelectionStyle}
              background={{ color: 'transparent' }}
              width='100%'
              onSelectToken={this.onSelectToken.bind(this)}
            ></token-selection>
          </i-grid-layout>
        </i-vstack>
      </i-panel>
    )
  }
}

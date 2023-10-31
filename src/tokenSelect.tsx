import {
  customElements,
  Module,
  ControlElement,
  Modal,
  Container,
  GridLayout,
  HStack,
  Panel
} from '@ijstech/components'
import { assets, ITokenObject } from '@scom/scom-token-list';
import customStyle, {
  tokenStyle,
  scrollbarStyle
} from './tokenSelect.css'

interface TokenSelectElement extends ControlElement {
  chainId?: number;
  token?: ITokenObject;
  tokenList?: ITokenObject[];
  onSelectToken?: (token: ITokenObject|undefined) => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['token-select']: TokenSelectElement
    }
  }
}

@customElements('token-select')
export class TokenSelect extends Module {
  private _token?: ITokenObject
  private _tokenList: Array<ITokenObject>
  private _chainId: number;
  private tokenMap: Map<string, HStack> = new Map()
  private currentToken: string = ''

  private mdCbToken: Modal
  private gridTokenList: GridLayout
  private wrapper: Panel
  private pnlList: Panel

  onSelectToken: (token: ITokenObject|undefined) => void

  constructor(parent?: Container, options?: any) {
    super(parent, options)
  }

  get token() {
    return this._token
  }
  set token(value: ITokenObject | undefined) {
    this._token = value
    if (value) this.setActive(value)
  }

  get tokenList(): Array<ITokenObject> {
    return this._tokenList
  }
  set tokenList(value: Array<ITokenObject>) {
    this._tokenList = value
    this.renderTokenList()
  }

  get chainId(): number {
    return this._chainId
  }

  set chainId(value: number | undefined) {
    this._chainId = value;
  }

  private renderToken(token: ITokenObject) {
    const tokenIconPath = token.logoURI || assets.tokenPath(token, this.chainId)
    const isActive = this.token && (token.address === this.token.address || token.symbol === this.token.symbol);
    if (isActive) this.currentToken = token.address || token.symbol;
    const tokenElm = (
      <i-hstack
        width='100%'
        class={`pointer token-item ${tokenStyle} ${isActive ? ' is-selected' : ''}`}
        verticalAlignment='center'
        padding={{ top: 5, bottom: 5, left: '0.75rem', right: '0.75rem' }}
        gap='0.5rem'
        onClick={() => this.onSelect(token)}
      >
        <i-vstack width='100%'>
          <i-hstack gap='0.5rem' verticalAlignment='center'>
            <i-hstack
              gap='0.5rem'
              verticalAlignment={'center'}
            >
              <i-image
                width={24}
                height={24}
                url={tokenIconPath}
                fallbackUrl={assets.fallbackUrl}
              />
              <i-label class="token-symbol" caption={token.symbol} />
            </i-hstack>
            {/* <i-label
              visible={this.type === 'button'}
              margin={{ left: 'auto' }}
              caption={formatNumber(token.balance, 4)}
            /> */}
          </i-hstack>
        </i-vstack>
      </i-hstack>
    )
    this.tokenMap.set(token.address || token.symbol, tokenElm)
    return tokenElm;
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
    if (!this.gridTokenList) return;
    this.tokenMap = new Map();
    this.gridTokenList.clearInnerHTML()
    if (this.tokenList?.length) {
      const tokenItems = this.tokenList.map((token: ITokenObject) =>
        this.renderToken(token)
      )
      this.gridTokenList.append(...tokenItems)
    } else {
      this.clearTokenList()
    }
  }

  showModal() {
    if (!this.enabled) return;
    if (this.maxWidth) {
      this.mdCbToken.maxWidth = this.maxWidth;
    } else {
      const wapperWidth = this.wrapper.offsetWidth;
      this.mdCbToken.maxWidth = wapperWidth < 230 ? 230 : wapperWidth;
    }
    if (this.minWidth) this.mdCbToken.minWidth = this.minWidth;
    this.pnlList.maxHeight = !this.maxHeight ? '300px' : this.maxHeight;
    if (this.background?.color) this.mdCbToken.background.color = this.background.color;
    this.mdCbToken.visible = !this.mdCbToken.visible;
  }

  hideModal() {
    this.mdCbToken.visible = false;
  }

  private setActive(token: ITokenObject) {
    if (this.currentToken && this.tokenMap.has(this.currentToken))
      this.tokenMap.get(this.currentToken).classList.remove('is-selected')
    const newToken = token.address || token.symbol
    if (this.tokenMap.has(newToken))
      this.tokenMap.get(newToken).classList.add('is-selected')
    this.currentToken = newToken
  }

  private async onSelect(token: ITokenObject) {
    this.token = token
    this.setActive(token)
    if (this.onSelectToken) this.onSelectToken({ ...token })
    this.hideModal()
  }

  init() {
    this.classList.add(customStyle)
    super.init()
    this.onSelectToken = this.getAttribute('onSelectToken', true) || this.onSelectToken
    this.token = this.getAttribute('token', true)
    const tokens = this.getAttribute('tokenList', true)
    if (tokens) this.tokenList = tokens
    this.mdCbToken.visible = false
  }

  render() {
    return (
      <i-panel id="wrapper">
        <i-modal
          id="mdCbToken"
          showBackdrop={false}
          width='100%'
          minWidth={'auto'}
          closeOnBackdropClick={true}
          closeOnScrollChildFixed={true}
          isChildFixed={true}
          popupPlacement='bottomRight'
          padding={{top: 0, left: 0, right: 0, bottom: 0}}
          class={`box-shadow`}
        >
          <i-panel
            id="pnlList"
            margin={{ top: '0.25rem' }}
            padding={{ top: 5, bottom: 5 }}
            overflow={{ y: 'auto', x: 'hidden' }}
            maxWidth='100%'
            border={{ radius: 2 }}
            class={scrollbarStyle}
          >
            <i-grid-layout
              id='gridTokenList'
              width='100%'
              columnsPerRow={1}
              templateRows={['max-content']}
              class={'is-combobox'}
            ></i-grid-layout>
          </i-panel>
        </i-modal>
      </i-panel>
    )
  }
}

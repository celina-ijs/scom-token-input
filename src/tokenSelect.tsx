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
  scrollbarStyle,
  modalStyle,
} from './tokenSelect.css'
import { getChainId } from './store/index';

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
  private _targetChainId: number;
  private tokenMap: Map<string, HStack> = new Map()
  private currentToken: string = ''
  private mapScrollTop: {[key: string]: number} = {};

  private mdCbToken: Modal
  private gridTokenList: GridLayout
  private wrapper: Panel

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
    return this.targetChainId || getChainId()
  }

  get targetChainId() {
    return this._targetChainId;
  }

  set targetChainId(value: number) {
    this._targetChainId = value;
  }

  private renderToken(token: ITokenObject) {
    const tokenIconPath = assets.tokenPath(token, this.chainId)
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
    this.mdCbToken.maxWidth = this.wrapper.offsetWidth;
    const child = this.mdCbToken.querySelector('.modal-wrapper') as HTMLElement;
    const isVisible = this.mdCbToken.visible;
    if (child) {
      child.style.position = isVisible ? 'unset' : 'relative';
      child.style.display = isVisible ? 'none' : 'block';
    }
    if (!isVisible) {
      const { x, y } = this.wrapper.getBoundingClientRect();
      const mdClientRect = this.mdCbToken.getBoundingClientRect();
      const { innerHeight, innerWidth } = window;
      const elmHeight = mdClientRect.height + 20;
      const elmWidth = mdClientRect.width;
      let totalScrollY = 0;
      for (const key in this.mapScrollTop) {
        totalScrollY += this.mapScrollTop[key];
      }
      if ((y + elmHeight) > innerHeight) {
        const elmTop = y - elmHeight + totalScrollY;
        this.mdCbToken.style.top = `${elmTop < 0 ? 0 : y - elmHeight + totalScrollY}px`;
      } else {
        this.mdCbToken.style.top = `${y + totalScrollY}px`;
      }
      if ((x + elmWidth) > innerWidth) {
        this.mdCbToken.style.left = `${innerWidth - elmWidth}px`;
      } else {
        this.mdCbToken.style.left = `${x}px`;
      }
    }
    this.mdCbToken.visible = !this.mdCbToken.visible;
  }

  hideModal() {
    this.mdCbToken.visible = false;
    this.hideModalWrapper();
  }

  private hideModalWrapper() {
    const modalWrapper = this.mdCbToken?.querySelector('.modal-wrapper') as HTMLElement;
    if (modalWrapper) {
      modalWrapper.style.display = 'none';
    }
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

  private generateUUID() {
    const uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return uuid;
  }

  init() {
    this.classList.add(customStyle)
    super.init()
    this.onSelectToken = this.getAttribute('onSelectToken', true) || this.onSelectToken
    this.token = this.getAttribute('token', true)
    const tokens = this.getAttribute('tokenList', true)
    if (tokens) this.tokenList = tokens
    this.mdCbToken.visible = false
    this.mdCbToken.style.position = "fixed"
    this.mdCbToken.zIndex = 999

    const getScrollY = (elm: HTMLElement) => {
      let scrollID = elm.getAttribute('scroll-id');
      if (!scrollID) {
        scrollID = this.generateUUID();
        elm.setAttribute('scroll-id', scrollID);
      }
      this.mapScrollTop[scrollID] = elm.scrollTop;
    }
    const onParentScroll = (e: any) => {
      if (this.mdCbToken.visible)
        this.mdCbToken.visible = false;
      if (e && !e.target.offsetParent && e.target.getAttribute) {
        getScrollY(e.target);
      }
    }
    let parentElement = this.mdCbToken.parentNode as HTMLElement;
    while (parentElement) {
      parentElement.addEventListener('scroll', (e) => onParentScroll(e));
      parentElement = parentElement.parentNode as HTMLElement;
      if (parentElement === document.body) {
        document.addEventListener('scroll', (e) => onParentScroll(e));
        break;
      } else if (parentElement && !parentElement.offsetParent && parentElement.scrollTop && typeof parentElement.getAttribute === 'function') {
        getScrollY(parentElement);
      }
    }
  }

  render() {
    return (
      <i-panel id="wrapper">
        <i-modal
          id="mdCbToken"
          showBackdrop={false}
          width='100%'
          minWidth={230}
          closeOnBackdropClick={true}
          onClose={this.hideModalWrapper}
          popupPlacement='bottomRight'
          class={`full-width box-shadow ${modalStyle}`}
        >
          <i-panel
            margin={{ top: '0.25rem' }}
            padding={{ top: 5, bottom: 5 }}
            overflow={{ y: 'auto', x: 'hidden' }}
            maxWidth='100%'
            maxHeight={300}
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

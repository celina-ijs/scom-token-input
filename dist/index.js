var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-token-input/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buttonStyle = exports.tokenSelectionStyle = exports.inputStyle = exports.markdownStyle = exports.imageStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.imageStyle = components_1.Styles.style({
        $nest: {
            '&>img': {
                maxWidth: 'unset',
                maxHeight: 'unset',
                borderRadius: 4
            }
        }
    });
    exports.markdownStyle = components_1.Styles.style({
        overflowWrap: 'break-word'
    });
    exports.inputStyle = components_1.Styles.style({
        $nest: {
            '> input': {
                background: 'transparent',
                border: 0,
                padding: 0,
                color: Theme.input.fontColor,
                fontSize: 'inherit'
            }
        }
    });
    exports.tokenSelectionStyle = components_1.Styles.style({
        $nest: {
            'i-button.token-button': {
                justifyContent: 'start'
            }
        }
    });
    exports.buttonStyle = components_1.Styles.style({
        boxShadow: 'none',
        whiteSpace: 'nowrap',
        gap: '0.5rem'
    });
    exports.default = components_1.Styles.style({
        $nest: {
            '#gridTokenInput': {
                boxShadow: 'none',
                outline: 'none',
                borderRadius: 'inherit',
                border: 'inherit',
                transition: 'all .5s ease-in'
            },
            '#gridTokenInput.focus-style': {
            // border: `1px solid ${Theme.colors.primary.main}`,
            // boxShadow: '0 0 0 2px rgba(87, 75, 144, .2)'
            },
            '.custom-border': {
                border: 'none',
                borderRadius: 'inherit',
                height: '100%'
            }
        }
    });
});
define("@scom/scom-token-input/global/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("@scom/scom-token-input/utils/index.ts", ["require", "exports", "@ijstech/eth-wallet"], function (require, exports, eth_wallet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.limitDecimals = exports.formatNumberWithSeparators = exports.formatNumber = void 0;
    const formatNumber = (value, decimals) => {
        let val = value;
        const minValue = '0.0000001';
        if (typeof value === 'string') {
            val = new eth_wallet_1.BigNumber(value).toNumber();
        }
        else if (typeof value === 'object') {
            val = value.toNumber();
        }
        if (val != 0 && new eth_wallet_1.BigNumber(val).lt(minValue)) {
            return `<${minValue}`;
        }
        return (0, exports.formatNumberWithSeparators)(val, decimals || 4);
    };
    exports.formatNumber = formatNumber;
    const formatNumberWithSeparators = (value, precision) => {
        if (!value)
            value = 0;
        if (precision) {
            let outputStr = '';
            if (value >= 1) {
                const unit = Math.pow(10, precision);
                const rounded = Math.floor(value * unit) / unit;
                outputStr = rounded.toLocaleString('en-US', { maximumFractionDigits: precision });
            }
            else {
                outputStr = value.toLocaleString('en-US', { maximumSignificantDigits: precision });
            }
            if (outputStr.length > 18) {
                outputStr = outputStr.substr(0, 18) + '...';
            }
            return outputStr;
        }
        else {
            return value.toLocaleString('en-US');
        }
    };
    exports.formatNumberWithSeparators = formatNumberWithSeparators;
    const limitDecimals = (value, decimals) => {
        let val = value;
        if (typeof value !== 'string') {
            val = val.toString();
        }
        let chart;
        if (val.includes('.')) {
            chart = '.';
        }
        else if (val.includes(',')) {
            chart = ',';
        }
        else {
            return value;
        }
        const parts = val.split(chart);
        let decimalsPart = parts[1];
        if (decimalsPart && decimalsPart.length > decimals) {
            parts[1] = decimalsPart.substr(0, decimals);
        }
        return parts.join(chart);
    };
    exports.limitDecimals = limitDecimals;
});
define("@scom/scom-token-input/tokenSelect.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.modalStyle = exports.tokenStyle = exports.scrollbarStyle = void 0;
    const Theme = components_2.Styles.Theme.ThemeVars;
    exports.scrollbarStyle = components_2.Styles.style({
        $nest: {
            '&::-webkit-scrollbar-track': {
                borderRadius: '12px',
                border: '1px solid transparent',
                backgroundColor: 'unset'
            },
            '&::-webkit-scrollbar': {
                width: '8px',
                backgroundColor: 'unset'
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '12px',
                background: '#d3d3d3 0% 0% no-repeat padding-box'
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: '#bababa 0% 0% no-repeat padding-box'
            }
        }
    });
    exports.tokenStyle = components_2.Styles.style({
        $nest: {
            '&:hover': {
                background: Theme.action.hover
            },
            '&.is-selected': {
                background: Theme.action.active,
                $nest: {
                    '.token-symbol': {
                        fontWeight: 600
                    }
                }
            }
        }
    });
    exports.modalStyle = components_2.Styles.style({
        $nest: {
            '.modal': {
                minWidth: 'auto'
            }
        }
    });
    exports.default = components_2.Styles.style({
        $nest: {
            '.full-width': {
                width: '100%',
                $nest: {
                    '.modal': {
                        padding: 0
                    }
                }
            },
            '.box-shadow > div': {
                boxShadow: '0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)'
            },
            '.is-ellipsis': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            },
            '.sort-panel': {
                marginBlock: '0.5rem',
                $nest: {
                    'i-icon': {
                        width: '10px',
                        height: '14px',
                        display: 'flex',
                        fill: Theme.text.primary,
                        position: 'absolute',
                        right: '0',
                        cursor: 'pointer'
                    },
                    '.icon-sort-up': {
                        top: '2px',
                    },
                    '.icon-sort-down': {
                        bottom: '2px',
                    },
                    '.icon-sorted': {
                        fill: Theme.colors.primary.main,
                    }
                }
            },
            '.search-input': {
                $nest: {
                    'input': {
                        padding: '1rem 1.5rem 1rem 2.25rem'
                    }
                }
            },
            '.centered': {
                transform: 'translateY(-50%)'
            },
            '.pointer': {
                cursor: 'pointer'
            },
            '.common-token:hover': {
                border: `1px solid ${Theme.colors.primary.main}`
            },
            '.btn-import': {
                background: 'transparent linear-gradient(255deg,#e75b66,#b52082) 0% 0% no-repeat padding-box',
                borderRadius: '5px',
                color: '#fff',
                fontSize: '1rem',
                padding: '0.25rem 1.25rem'
            },
            '#btnToken': {
                justifyContent: 'space-between'
            }
        }
    });
});
define("@scom/scom-token-input/store/index.ts", ["require", "exports", "@ijstech/eth-wallet"], function (require, exports, eth_wallet_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getChainId = exports.isRpcWalletConnected = exports.getRpcWallet = exports.updateStore = exports.viewOnExplorerByAddress = exports.getNetworkInfo = void 0;
    const state = {
        rpcWalletId: "",
    };
    const getNetworkInfo = (chainId) => {
        return eth_wallet_2.Wallet.getClientInstance().getNetworkInfo(chainId);
    };
    exports.getNetworkInfo = getNetworkInfo;
    const viewOnExplorerByAddress = (chainId, address) => {
        let network = (0, exports.getNetworkInfo)(chainId);
        if (network && network.blockExplorerUrls[0]) {
            const url = `${network.blockExplorerUrls[0]}${address}`;
            window.open(url);
        }
    };
    exports.viewOnExplorerByAddress = viewOnExplorerByAddress;
    const updateStore = (data) => {
        if (data.rpcWalletId) {
            state.rpcWalletId = data.rpcWalletId;
        }
    };
    exports.updateStore = updateStore;
    const getRpcWallet = () => {
        return eth_wallet_2.Wallet.getRpcWalletInstance(state.rpcWalletId);
    };
    exports.getRpcWallet = getRpcWallet;
    function isRpcWalletConnected() {
        const wallet = (0, exports.getRpcWallet)();
        return wallet === null || wallet === void 0 ? void 0 : wallet.isConnected;
    }
    exports.isRpcWalletConnected = isRpcWalletConnected;
    function getChainId() {
        const rpcWallet = (0, exports.getRpcWallet)();
        return rpcWallet === null || rpcWallet === void 0 ? void 0 : rpcWallet.chainId;
    }
    exports.getChainId = getChainId;
    ;
});
define("@scom/scom-token-input/tokenSelect.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-token-list", "@scom/scom-token-input/tokenSelect.css.ts", "@scom/scom-token-input/store/index.ts"], function (require, exports, components_3, scom_token_list_1, tokenSelect_css_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenSelect = void 0;
    let TokenSelect = class TokenSelect extends components_3.Module {
        constructor(parent, options) {
            super(parent, options);
            this.tokenMap = new Map();
            this.currentToken = '';
            this.mapScrollTop = {};
        }
        get token() {
            return this._token;
        }
        set token(value) {
            this._token = value;
            if (value)
                this.setActive(value);
        }
        get tokenList() {
            return this._tokenList;
        }
        set tokenList(value) {
            this._tokenList = value;
            this.renderTokenList();
        }
        get chainId() {
            return this.targetChainId || (0, index_1.getChainId)();
        }
        get targetChainId() {
            return this._targetChainId;
        }
        set targetChainId(value) {
            this._targetChainId = value;
        }
        renderToken(token) {
            const tokenIconPath = scom_token_list_1.assets.tokenPath(token, this.chainId);
            const isActive = this.token && (token.address === this.token.address || token.symbol === this.token.symbol);
            if (isActive)
                this.currentToken = token.address || token.symbol;
            const tokenElm = (this.$render("i-hstack", { width: '100%', class: `pointer token-item ${tokenSelect_css_1.tokenStyle} ${isActive ? ' is-selected' : ''}`, verticalAlignment: 'center', padding: { top: 5, bottom: 5, left: '0.75rem', right: '0.75rem' }, gap: '0.5rem', onClick: () => this.onSelect(token) },
                this.$render("i-vstack", { width: '100%' },
                    this.$render("i-hstack", { gap: '0.5rem', verticalAlignment: 'center' },
                        this.$render("i-hstack", { gap: '0.5rem', verticalAlignment: 'center' },
                            this.$render("i-image", { width: 24, height: 24, url: tokenIconPath, fallbackUrl: scom_token_list_1.assets.fallbackUrl }),
                            this.$render("i-label", { class: "token-symbol", caption: token.symbol }))))));
            this.tokenMap.set(token.address || token.symbol, tokenElm);
            return tokenElm;
        }
        clearTokenList() {
            this.gridTokenList.clearInnerHTML();
            this.gridTokenList.append(this.$render("i-label", { class: 'text-center', caption: 'No tokens found', margin: { top: '1rem', bottom: '1rem' } }));
        }
        async renderTokenList() {
            var _a;
            if (!this.gridTokenList)
                return;
            this.tokenMap = new Map();
            this.gridTokenList.clearInnerHTML();
            if ((_a = this.tokenList) === null || _a === void 0 ? void 0 : _a.length) {
                const tokenItems = this.tokenList.map((token) => this.renderToken(token));
                this.gridTokenList.append(...tokenItems);
            }
            else {
                this.clearTokenList();
            }
        }
        showModal() {
            if (!this.enabled)
                return;
            const wapperWidth = this.wrapper.offsetWidth;
            this.mdCbToken.maxWidth = wapperWidth < 230 ? 230 : wapperWidth;
            const child = this.mdCbToken.querySelector('.modal-wrapper');
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
                }
                else {
                    this.mdCbToken.style.top = `${y + totalScrollY}px`;
                }
                if ((x + elmWidth) > innerWidth) {
                    this.mdCbToken.style.left = `${innerWidth - elmWidth}px`;
                }
                else {
                    this.mdCbToken.style.left = `${x}px`;
                }
            }
            this.mdCbToken.visible = !this.mdCbToken.visible;
        }
        hideModal() {
            this.mdCbToken.visible = false;
            this.hideModalWrapper();
        }
        hideModalWrapper() {
            var _a;
            const modalWrapper = (_a = this.mdCbToken) === null || _a === void 0 ? void 0 : _a.querySelector('.modal-wrapper');
            if (modalWrapper) {
                modalWrapper.style.display = 'none';
            }
        }
        setActive(token) {
            if (this.currentToken && this.tokenMap.has(this.currentToken))
                this.tokenMap.get(this.currentToken).classList.remove('is-selected');
            const newToken = token.address || token.symbol;
            if (this.tokenMap.has(newToken))
                this.tokenMap.get(newToken).classList.add('is-selected');
            this.currentToken = newToken;
        }
        async onSelect(token) {
            this.token = token;
            this.setActive(token);
            if (this.onSelectToken)
                this.onSelectToken(Object.assign({}, token));
            this.hideModal();
        }
        generateUUID() {
            const uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            return uuid;
        }
        init() {
            this.classList.add(tokenSelect_css_1.default);
            super.init();
            this.onSelectToken = this.getAttribute('onSelectToken', true) || this.onSelectToken;
            this.token = this.getAttribute('token', true);
            const tokens = this.getAttribute('tokenList', true);
            if (tokens)
                this.tokenList = tokens;
            this.mdCbToken.visible = false;
            this.mdCbToken.style.position = "fixed";
            this.mdCbToken.zIndex = 999;
            const getScrollY = (elm) => {
                let scrollID = elm.getAttribute('scroll-id');
                if (!scrollID) {
                    scrollID = this.generateUUID();
                    elm.setAttribute('scroll-id', scrollID);
                }
                this.mapScrollTop[scrollID] = elm.scrollTop;
            };
            const onParentScroll = (e) => {
                if (this.mdCbToken.visible)
                    this.mdCbToken.visible = false;
                if (e && !e.target.offsetParent && e.target.getAttribute) {
                    getScrollY(e.target);
                }
            };
            let parentElement = this.mdCbToken.parentNode;
            while (parentElement) {
                parentElement.addEventListener('scroll', (e) => onParentScroll(e));
                parentElement = parentElement.parentNode;
                if (parentElement === document.body) {
                    document.addEventListener('scroll', (e) => onParentScroll(e));
                    break;
                }
                else if (parentElement && !parentElement.offsetParent && parentElement.scrollTop && typeof parentElement.getAttribute === 'function') {
                    getScrollY(parentElement);
                }
            }
        }
        render() {
            return (this.$render("i-panel", { id: "wrapper" },
                this.$render("i-modal", { id: "mdCbToken", showBackdrop: false, width: '100%', minWidth: 230, closeOnBackdropClick: true, onClose: this.hideModalWrapper, popupPlacement: 'bottomRight', class: `full-width box-shadow ${tokenSelect_css_1.modalStyle}` },
                    this.$render("i-panel", { margin: { top: '0.25rem' }, padding: { top: 5, bottom: 5 }, overflow: { y: 'auto', x: 'hidden' }, maxWidth: '100%', maxHeight: 300, border: { radius: 2 }, class: tokenSelect_css_1.scrollbarStyle },
                        this.$render("i-grid-layout", { id: 'gridTokenList', width: '100%', columnsPerRow: 1, templateRows: ['max-content'], class: 'is-combobox' })))));
        }
    };
    TokenSelect = __decorate([
        (0, components_3.customElements)('token-select')
    ], TokenSelect);
    exports.TokenSelect = TokenSelect;
});
define("@scom/scom-token-input", ["require", "exports", "@ijstech/components", "@scom/scom-token-input/index.css.ts", "@scom/scom-token-input/utils/index.ts", "@scom/scom-token-list", "@scom/scom-token-input/store/index.ts"], function (require, exports, components_4, index_css_1, index_2, scom_token_list_2, index_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomTokenInput = class ScomTokenInput extends components_4.Module {
        constructor(parent, options) {
            super(parent, options);
            this._isCommonShown = false;
            this._isSortBalanceShown = true;
            this._isBtnMaxShown = true;
            this._readOnly = false;
            this._tokenReadOnly = false;
            this._inputReadOnly = false;
            this._importable = false;
            this._isInputShown = true;
            this._isBalanceShown = true;
            this._tokenDataListProp = [];
            this._withoutConnected = false;
            this._rpcWalletId = '';
            this.walletEvents = [];
            this.clientEvents = [];
            this.sortToken = (a, b, asc) => {
                if (a.balance != b.balance) {
                    return asc ? a.balance - b.balance : b.balance - a.balance;
                }
                if (a.symbol.toLowerCase() < b.symbol.toLowerCase()) {
                    return -1;
                }
                if (a.symbol.toLowerCase() > b.symbol.toLowerCase()) {
                    return 1;
                }
                return 0;
            };
            this.$eventBus = components_4.application.EventBus;
            this.registerEvent();
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        async onRefresh() {
            if ((0, scom_token_list_2.isWalletConnected)()) {
                this.tokenBalancesMap = scom_token_list_2.tokenStore.tokenBalances || {};
                if (this.token) {
                    const token = this.tokenDataList.find((t) => {
                        var _a, _b;
                        return (t.address && t.address == ((_a = this.token) === null || _a === void 0 ? void 0 : _a.address)) ||
                            t.symbol == ((_b = this.token) === null || _b === void 0 ? void 0 : _b.symbol);
                    });
                    if (!token)
                        this.token = undefined;
                    else
                        this.token = token;
                }
            }
            this.updateTokenUI();
            this.renderTokenList();
            this.updateStatusButton();
            this.pnlTopSection.visible = this.isBalanceShown && !!this.title;
        }
        async updateDataByNewToken() {
            this.tokenBalancesMap = scom_token_list_2.tokenStore.tokenBalances || {};
            this.renderTokenList();
        }
        async onUpdateData(onPaid) {
            const rpcWallet = (0, index_3.getRpcWallet)();
            this.tokenBalancesMap = onPaid ? scom_token_list_2.tokenStore.tokenBalances : await scom_token_list_2.tokenStore.updateAllTokenBalances(rpcWallet);
            this.onRefresh();
        }
        registerEvent() {
            // const clientWallet = Wallet.getClientInstance();
            // this.walletEvents.push(clientWallet.registerWalletEvent(this, Constants.ClientWalletEvent.AccountsChanged, async (payload: Record<string, any>) => {
            //   this.onUpdateData();
            // }));
            // this.clientEvents.push(this.$eventBus.register(this, EventId.chainChanged, () => this.onUpdateData(false)))
            // this.clientEvents.push(this.$eventBus.register(this, EventId.Paid, () => this.onUpdateData(true)))
            // this.clientEvents.push(this.$eventBus.register(this, EventId.EmitNewToken, this.updateDataByNewToken))
        }
        onHide() {
            const rpcWallet = (0, index_3.getRpcWallet)();
            for (let event of this.walletEvents) {
                rpcWallet.unregisterWalletEvent(event);
            }
            this.walletEvents = [];
            for (let event of this.clientEvents) {
                event.unregister();
            }
            this.clientEvents = [];
        }
        get tokenDataListProp() {
            var _a;
            return (_a = this._tokenDataListProp) !== null && _a !== void 0 ? _a : [];
        }
        set tokenDataListProp(value) {
            this._tokenDataListProp = value !== null && value !== void 0 ? value : [];
            if (this.type === 'button') {
                if (this.mdToken)
                    this.mdToken.tokenDataListProp = this.tokenDataListProp;
            }
            // this.renderTokenList();
        }
        get tokenListByChainId() {
            var _a, _b;
            let list = [];
            const propList = this.tokenDataListProp.filter(f => !f.chainId || f.chainId === this.chainId);
            const nativeToken = scom_token_list_2.ChainNativeTokenByChainId[this.chainId];
            const tokens = scom_token_list_2.DefaultERC20Tokens[this.chainId];
            for (const token of propList) {
                const tokenAddress = (_a = token.address) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                if (!tokenAddress || tokenAddress === ((_b = nativeToken === null || nativeToken === void 0 ? void 0 : nativeToken.symbol) === null || _b === void 0 ? void 0 : _b.toLowerCase())) {
                    if (nativeToken)
                        list.push(Object.assign(Object.assign({}, nativeToken), { chainId: this.chainId }));
                }
                else {
                    const tokenObj = tokens.find(v => { var _a; return ((_a = v.address) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === tokenAddress; });
                    if (tokenObj)
                        list.push(Object.assign(Object.assign({}, token), { chainId: this.chainId }));
                }
            }
            return list;
        }
        get tokenDataList() {
            var _a;
            let tokenList = ((_a = this.tokenListByChainId) === null || _a === void 0 ? void 0 : _a.length) ? this.tokenListByChainId : scom_token_list_2.tokenStore.getTokenList(this.chainId);
            if (this.tokenDataListProp && this.tokenDataListProp.length) {
                tokenList = this.tokenDataListProp;
            }
            if (!this.tokenBalancesMap || !Object.keys(this.tokenBalancesMap).length) {
                this.tokenBalancesMap = scom_token_list_2.tokenStore.tokenBalances || {};
            }
            return tokenList.map((token) => {
                var _a;
                const tokenObject = Object.assign({}, token);
                const nativeToken = scom_token_list_2.ChainNativeTokenByChainId[this.chainId];
                if ((nativeToken === null || nativeToken === void 0 ? void 0 : nativeToken.symbol) && token.symbol === nativeToken.symbol) {
                    Object.assign(tokenObject, { isNative: true });
                }
                if (!(0, scom_token_list_2.isWalletConnected)()) {
                    Object.assign(tokenObject, {
                        balance: 0,
                    });
                }
                else if (this.tokenBalancesMap) {
                    Object.assign(tokenObject, {
                        balance: this.tokenBalancesMap[((_a = token.address) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || token.symbol] || 0,
                    });
                }
                return tokenObject;
            }).sort(this.sortToken);
        }
        get onSelectToken() {
            return this._onSelectToken;
        }
        set onSelectToken(callback) {
            this._onSelectToken = callback;
        }
        get type() {
            var _a;
            return (_a = this._type) !== null && _a !== void 0 ? _a : 'button';
        }
        set type(value) {
            if (value === this._type)
                return;
            this._type = value;
            if (this.btnToken)
                this.btnToken.width = value === 'button' ? "auto" : '100%';
            // this.onRefresh()
        }
        get title() {
            var _a;
            return (_a = this._title) !== null && _a !== void 0 ? _a : '';
        }
        set title(value) {
            this._title = value;
            let labelEl;
            if (typeof value === 'string') {
                labelEl = new components_4.Label(undefined, {
                    caption: value,
                    font: { color: Theme.colors.primary.main, size: '1rem', bold: true },
                });
            }
            else {
                labelEl = value;
            }
            if (!this.pnlTitle)
                this.pnlTitle = new components_4.HStack();
            this.pnlTitle.clearInnerHTML();
            this.pnlTitle.appendChild(labelEl);
        }
        get token() {
            return this._token;
        }
        set token(value) {
            this._token = value;
            // this.onSelectFn(value)
            if (this.cbToken)
                this.cbToken.token = value;
            if (this.mdToken)
                this.mdToken.token = value;
            this.updateTokenUI();
        }
        set address(value) {
            var _a, _b;
            if (!value) {
                this.token = null;
                return;
            }
            const tokenAddress = value.toLowerCase();
            let tokenObj = null;
            if (tokenAddress.startsWith('0x')) {
                tokenObj = (_a = scom_token_list_2.DefaultERC20Tokens[this.chainId]) === null || _a === void 0 ? void 0 : _a.find(v => { var _a; return ((_a = v.address) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === tokenAddress; });
            }
            else {
                const nativeToken = scom_token_list_2.ChainNativeTokenByChainId[this.chainId];
                tokenObj = ((_b = nativeToken === null || nativeToken === void 0 ? void 0 : nativeToken.symbol) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === tokenAddress ? nativeToken : null;
            }
            this.token = tokenObj;
        }
        get chainId() {
            return this.targetChainId || (0, index_3.getChainId)();
        }
        get isCommonShown() {
            return this._isCommonShown;
        }
        set isCommonShown(value) {
            this._isCommonShown = value;
            if (this.mdToken)
                this.mdToken.isCommonShown = value;
        }
        get isSortBalanceShown() {
            return this._isSortBalanceShown;
        }
        set isSortBalanceShown(value) {
            this._isSortBalanceShown = value;
            if (this.mdToken)
                this.mdToken.isSortBalanceShown = value;
        }
        get isBtnMaxShown() {
            return this._isBtnMaxShown;
        }
        set isBtnMaxShown(value) {
            this._isBtnMaxShown = value;
            if (this.btnMax)
                this.btnMax.visible = value;
        }
        get readOnly() {
            return this._readOnly;
        }
        set readOnly(value) {
            this._readOnly = value;
            if (this.btnToken) {
                this.btnToken.enabled = !value;
                this.btnToken.rightIcon.visible = !value;
            }
            if (this.btnMax)
                this.btnMax.enabled = !value;
            if (this.inputAmount)
                this.inputAmount.readOnly = value;
        }
        get tokenReadOnly() {
            return this._tokenReadOnly;
        }
        set tokenReadOnly(value) {
            this._tokenReadOnly = value;
            if (this.btnToken) {
                this.btnToken.enabled = !this._readOnly && !value;
                this.btnToken.rightIcon.visible = !this._readOnly && !value;
            }
        }
        get inputReadOnly() {
            return this._inputReadOnly;
        }
        set inputReadOnly(value) {
            this._inputReadOnly = value;
            if (this.inputAmount) {
                this.inputAmount.readOnly = value;
            }
        }
        get importable() {
            return this._importable;
        }
        set importable(value) {
            this._importable = value;
            if (this.mdToken)
                this.mdToken.importable = value;
        }
        get isInputShown() {
            return this._isInputShown;
        }
        set isInputShown(value) {
            this._isInputShown = value;
            if (this.inputAmount) {
                this.inputAmount.visible = value;
                this.gridTokenInput.templateColumns = value ? ['50%', 'auto'] : ['auto'];
            }
        }
        get isBalanceShown() {
            return this._isBalanceShown;
        }
        set isBalanceShown(value) {
            this._isBalanceShown = value;
            if (this.pnlBalance)
                this.pnlBalance.visible = value;
        }
        get amount() {
            return this.inputAmount.value;
        }
        get rpcWalletId() {
            return this._rpcWalletId;
        }
        set rpcWalletId(value) {
            this._rpcWalletId = value;
            (0, index_3.updateStore)({ rpcWalletId: value });
            if (this.mdToken)
                this.mdToken.rpcWalletId = value;
            // this.onUpdateData()
        }
        get placeholder() {
            var _a, _b;
            return (_b = (_a = this.inputAmount) === null || _a === void 0 ? void 0 : _a.placeholder) !== null && _b !== void 0 ? _b : 'Enter an amount';
        }
        set placeholder(value) {
            this.inputAmount.placeholder = value !== null && value !== void 0 ? value : 'Enter an amount';
        }
        get value() {
            return this.inputAmount.value;
        }
        set value(value) {
            if (this.inputAmount)
                this.inputAmount.value = value;
        }
        get targetChainId() {
            return this._targetChainId;
        }
        set targetChainId(value) {
            this._targetChainId = value;
        }
        getBalance(token) {
            var _a;
            if (token && (scom_token_list_2.tokenStore === null || scom_token_list_2.tokenStore === void 0 ? void 0 : scom_token_list_2.tokenStore.tokenBalances) && Object.keys(scom_token_list_2.tokenStore.tokenBalances).length) {
                const address = (token.address || '').toLowerCase();
                let balance = address ? ((_a = scom_token_list_2.tokenStore.tokenBalances[address]) !== null && _a !== void 0 ? _a : 0) : (scom_token_list_2.tokenStore.tokenBalances[token.symbol] || 0);
                return balance;
            }
            return 0;
        }
        async onSetMax() {
            const balance = this.getBalance(this.token);
            this.inputAmount.value = (0, index_2.limitDecimals)(balance, 4);
            if (this.onSetMaxBalance)
                this.onSetMaxBalance();
        }
        async onAmountChanged(target, event) {
            if (this.onInputAmountChanged)
                this.onInputAmountChanged(target, event);
        }
        onToggleFocus(value) {
            value ?
                this.gridTokenInput.classList.add('focus-style') :
                this.gridTokenInput.classList.remove('focus-style');
        }
        _handleFocus(event) {
            this.onToggleFocus(true);
            return super._handleFocus(event);
        }
        async renderTokenList(init) {
            var _a;
            if (this.type === 'combobox') {
                if (!this.cbToken)
                    return;
                if (!this.cbToken.isConnected)
                    await this.cbToken.ready();
                if (this.cbToken.targetChainId !== this.targetChainId) {
                    this.cbToken.targetChainId = this.targetChainId;
                    this.token = null;
                }
                this.cbToken.visible = true;
                if (init && ((_a = this.cbToken.tokenList) === null || _a === void 0 ? void 0 : _a.length) && this.tokenDataList.length) {
                    const token = this.cbToken.tokenList[0];
                    const tokenData = this.tokenDataList[0];
                    if (JSON.stringify(token) !== JSON.stringify(tokenData) || this.cbToken.tokenList.length !== this.tokenDataList.length) {
                        this.cbToken.tokenList = [...this.tokenDataList];
                    }
                }
                else {
                    this.cbToken.tokenList = [...this.tokenDataList];
                }
            }
            else {
                if (!this.mdToken)
                    return;
                if (!this.mdToken.isConnected)
                    await this.mdToken.ready();
                if (this.cbToken)
                    this.cbToken.visible = false;
                this.mdToken.tokenDataListProp = this.tokenDataListProp;
                if (this.mdToken.onRefresh)
                    this.mdToken.onRefresh();
            }
        }
        async updateTokenUI() {
            var _a;
            this.value = '';
            if (((_a = this._token) === null || _a === void 0 ? void 0 : _a.isNew) && (0, index_3.isRpcWalletConnected)()) {
                const rpcWallet = (0, index_3.getRpcWallet)();
                await scom_token_list_2.tokenStore.updateAllTokenBalances(rpcWallet);
            }
            this.updateBalance();
            this.updateTokenButton();
        }
        async updateBalance() {
            var _a;
            if (!this.lbBalance)
                return;
            if (!this.lbBalance.isConnected)
                await this.lbBalance.ready();
            if (this.token) {
                const symbol = ((_a = this.token) === null || _a === void 0 ? void 0 : _a.symbol) || '';
                const balance = this.getBalance(this.token);
                this.lbBalance.caption = `${(0, index_2.formatNumber)(balance, 6)} ${symbol}`;
            }
            else {
                this.lbBalance.caption = '0.00';
            }
        }
        updateStatusButton() {
            const status = (0, scom_token_list_2.isWalletConnected)();
            const value = !this.readOnly && (status || this._withoutConnected);
            if (this.btnToken) {
                this.btnToken.enabled = value && !this.tokenReadOnly;
            }
            if (this.btnMax) {
                this.btnMax.enabled = value;
            }
        }
        updateTokenButton() {
            if (!this.btnToken)
                return;
            let token = this.token ? Object.assign({}, this.token) : undefined;
            if (!token)
                token = (this.tokenDataList || []).find((v) => {
                    var _a, _b;
                    return (v.address && v.address == ((_a = this.token) === null || _a === void 0 ? void 0 : _a.address)) ||
                        v.symbol == ((_b = this.token) === null || _b === void 0 ? void 0 : _b.symbol);
                });
            if (token) {
                const tokenIconPath = scom_token_list_2.assets.tokenPath(token, this.chainId);
                this.btnToken.caption = `<i-hstack verticalAlignment="center" gap="0.5rem">
          <i-panel>
            <i-image width=${24} height=${24} url="${tokenIconPath}" fallbackUrl="${scom_token_list_2.assets.fallbackUrl}"></i-image>
          </i-panel>
          <i-label caption="${(token === null || token === void 0 ? void 0 : token.symbol) || ''}"></i-label>
        </i-hstack>`;
                this.btnMax.visible = this.isBtnMaxShown;
            }
            else {
                this.btnToken.caption = 'Select Token';
                this.btnMax.visible = false;
            }
        }
        async onButtonClicked() {
            // this.onRefresh();
            if (this.type === 'combobox') {
                await this.renderTokenList(true);
                this.cbToken.showModal();
            }
            else {
                this.mdToken.tokenDataListProp = this.tokenDataListProp;
                this.mdToken.showModal();
            }
        }
        async onSelectFn(token) {
            if (this.onChanged) {
                this.onChanged(token);
            }
            this._token = token;
            this.updateTokenUI();
            this.onSelectToken && this.onSelectToken(token);
        }
        init() {
            this.classList.add(index_css_1.default);
            super.init();
            this.onInputAmountChanged = this.getAttribute('onInputAmountChanged', true) || this.onInputAmountChanged;
            this.onSetMaxBalance = this.getAttribute('onSetMaxBalance', true) || this.onSetMaxBalance;
            this.onSelectToken = this.getAttribute('onSelectToken', true) || this.onSelectToken;
            this.title = this.getAttribute('title', true, '');
            this._withoutConnected = this.getAttribute('withoutConnected', true, false);
            this.targetChainId = this.getAttribute('targetChainId', true);
            const address = this.getAttribute('address', true);
            if (address)
                this.address = address;
            const tokenDataListProp = this.getAttribute('tokenDataListProp', true);
            if (tokenDataListProp)
                this.tokenDataListProp = tokenDataListProp;
            const token = this.getAttribute('token', true);
            if (token)
                this.token = token;
            this.readOnly = this.getAttribute('readOnly', true, false);
            this.tokenReadOnly = this.getAttribute('tokenReadOnly', true, false);
            this.inputReadOnly = this.getAttribute('inputReadOnly', true, false);
            this.isBtnMaxShown = this.getAttribute('isBtnMaxShown', true, true);
            this.type = this.getAttribute('type', true, 'button');
            if (this.type === 'button') {
                this.isCommonShown = this.getAttribute('isCommonShown', true, false);
                this.isSortBalanceShown = this.getAttribute('isSortBalanceShown', true, true);
                this.importable = this.getAttribute('importable', true, false);
            }
            this.isInputShown = this.getAttribute('isInputShown', true, true);
            this.isBalanceShown = this.getAttribute('isBalanceShown', true, true);
            const rpcWalletId = this.getAttribute('rpcWalletId', true);
            if (rpcWalletId)
                this.rpcWalletId = rpcWalletId;
            this.placeholder = this.getAttribute('placeholder', true);
            const value = this.getAttribute('value', true);
            if (value !== undefined)
                this.value = value;
            this.pnlTopSection.visible = this.isBalanceShown && !!this.title;
            document.addEventListener('click', (event) => {
                const target = event.target;
                const tokenInput = target.closest('#gridTokenInput');
                if (!tokenInput || !tokenInput.isSameNode(this.gridTokenInput))
                    this.onToggleFocus(false);
                else
                    this.onToggleFocus(true);
            });
        }
        render() {
            return (this.$render("i-hstack", { class: "custom-border", width: '100%', verticalAlignment: "center" },
                this.$render("i-vstack", { gap: '0.5rem', width: '100%', class: "custom-border", margin: { top: '0.5rem', bottom: '0.5rem' } },
                    this.$render("i-hstack", { id: "pnlTopSection", horizontalAlignment: 'space-between', verticalAlignment: 'center' },
                        this.$render("i-hstack", { id: "pnlTitle", gap: "4px" }),
                        this.$render("i-hstack", { id: "pnlBalance", horizontalAlignment: 'end', verticalAlignment: 'center', gap: '0.5rem', margin: { bottom: '0.5rem' }, opacity: 0.6 },
                            this.$render("i-label", { caption: 'Balance:', font: { size: '0.875rem' } }),
                            this.$render("i-label", { id: 'lbBalance', font: { size: '0.875rem' }, caption: "0" }))),
                    this.$render("i-grid-layout", { id: 'gridTokenInput', templateColumns: ['50%', 'auto'], background: { color: Theme.input.background }, font: { color: Theme.input.fontColor }, verticalAlignment: 'center', lineHeight: 1.5715, padding: { left: 11, right: 11 }, gap: { column: '0.5rem' } },
                        this.$render("i-input", { id: 'inputAmount', width: '100%', height: '100%', class: index_css_1.inputStyle, font: { size: 'inherit' }, inputType: 'number', placeholder: 'Enter an amount', onChanged: this.onAmountChanged }),
                        this.$render("i-panel", { id: "pnlSelection", width: '100%', class: index_css_1.tokenSelectionStyle },
                            this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "end", gap: "0.25rem" },
                                this.$render("i-button", { id: 'btnMax', visible: false, caption: 'Max', height: '100%', background: { color: Theme.colors.success.main }, font: { color: Theme.colors.success.contrastText }, padding: {
                                        top: '0.25rem',
                                        bottom: '0.25rem',
                                        left: '0.5rem',
                                        right: '0.5rem',
                                    }, onClick: () => this.onSetMax() }),
                                this.$render("i-button", { id: 'btnToken', class: `${index_css_1.buttonStyle}`, height: '100%', caption: 'Select Token', rightIcon: { width: 14, height: 14, name: 'angle-down' }, border: { radius: 0 }, background: { color: 'transparent' }, font: { color: Theme.input.fontColor }, padding: {
                                        top: '0.25rem',
                                        bottom: '0.25rem',
                                        left: '0.5rem',
                                        right: '0.5rem',
                                    }, onClick: this.onButtonClicked })),
                            this.$render("token-select", { id: "cbToken", width: "100%", onSelectToken: this.onSelectFn }),
                            this.$render("i-scom-token-modal", { id: "mdToken", width: "100%", onSelectToken: this.onSelectFn }))))));
        }
    };
    ScomTokenInput = __decorate([
        components_4.customModule,
        (0, components_4.customElements)('i-scom-token-input')
    ], ScomTokenInput);
    exports.default = ScomTokenInput;
});

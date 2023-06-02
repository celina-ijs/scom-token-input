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
                color: Theme.input.fontColor
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
                borderRadius: 6,
                border: `1px solid ${Theme.divider}`,
                transition: 'all .5s ease-in'
            },
            '#gridTokenInput.focus-style': {
                border: `1px solid ${Theme.colors.primary.main}`,
                boxShadow: '0 0 0 2px rgba(87, 75, 144, .2)'
            }
        }
    });
});
define("@scom/scom-token-input/global/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    ;
});
define("@scom/scom-token-input/store/index.ts", ["require", "exports", "@ijstech/eth-wallet"], function (require, exports, eth_wallet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.viewOnExplorerByAddress = exports.getNetworkInfo = exports.getChainId = void 0;
    function getChainId() {
        return eth_wallet_1.Wallet.getInstance().chainId;
    }
    exports.getChainId = getChainId;
    const getNetworkInfo = (chainId) => {
        return eth_wallet_1.Wallet.getClientInstance().getNetworkInfo(chainId);
    };
    exports.getNetworkInfo = getNetworkInfo;
    const viewOnExplorerByAddress = (chainId, address) => {
        let network = exports.getNetworkInfo(chainId);
        if (network && network.blockExplorerUrls[0]) {
            const url = `${network.blockExplorerUrls[0]}${address}`;
            window.open(url);
        }
    };
    exports.viewOnExplorerByAddress = viewOnExplorerByAddress;
});
define("@scom/scom-token-input/utils/token.ts", ["require", "exports", "@ijstech/eth-wallet", "@scom/scom-token-input/store/index.ts"], function (require, exports, eth_wallet_2, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getTokenBalance = exports.getERC20Amount = void 0;
    const getERC20Amount = async (wallet, tokenAddress, decimals) => {
        try {
            let erc20 = new eth_wallet_2.Erc20(wallet, tokenAddress, decimals);
            return await erc20.balance;
        }
        catch (_a) {
            return new eth_wallet_2.BigNumber(0);
        }
    };
    exports.getERC20Amount = getERC20Amount;
    const getTokenBalance = async (token) => {
        var _a;
        const wallet = eth_wallet_2.Wallet.getInstance();
        let balance = new eth_wallet_2.BigNumber(0);
        if (!token)
            return balance;
        if (token.address) {
            balance = await exports.getERC20Amount(wallet, token.address, token.decimals);
        }
        else {
            const networkInfo = index_1.getNetworkInfo(wallet.chainId);
            const symbol = ((_a = networkInfo === null || networkInfo === void 0 ? void 0 : networkInfo.nativeCurrency) === null || _a === void 0 ? void 0 : _a.symbol) || '';
            if (symbol && symbol === token.symbol)
                balance = await wallet.balance;
        }
        return balance;
    };
    exports.getTokenBalance = getTokenBalance;
});
define("@scom/scom-token-input/utils/index.ts", ["require", "exports", "@ijstech/eth-wallet", "@scom/scom-token-input/utils/token.ts"], function (require, exports, eth_wallet_3, token_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getTokenBalance = exports.getERC20Amount = exports.limitDecimals = exports.formatNumberWithSeparators = exports.formatNumber = void 0;
    const formatNumber = (value, decimals) => {
        let val = value;
        const minValue = '0.0000001';
        if (typeof value === 'string') {
            val = new eth_wallet_3.BigNumber(value).toNumber();
        }
        else if (typeof value === 'object') {
            val = value.toNumber();
        }
        if (val != 0 && new eth_wallet_3.BigNumber(val).lt(minValue)) {
            return `<${minValue}`;
        }
        return exports.formatNumberWithSeparators(val, decimals || 4);
    };
    exports.formatNumber = formatNumber;
    const formatNumberWithSeparators = (value, precision) => {
        if (!value)
            value = 0;
        if (precision) {
            let outputStr = '';
            if (value >= 1) {
                outputStr = value.toLocaleString('en-US', { maximumFractionDigits: precision });
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
    Object.defineProperty(exports, "getERC20Amount", { enumerable: true, get: function () { return token_1.getERC20Amount; } });
    Object.defineProperty(exports, "getTokenBalance", { enumerable: true, get: function () { return token_1.getTokenBalance; } });
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
define("@scom/scom-token-input/tokenSelect.tsx", ["require", "exports", "@ijstech/components", "@scom/scom-token-list", "@scom/scom-token-input/tokenSelect.css.ts", "@scom/scom-token-input/store/index.ts"], function (require, exports, components_3, scom_token_list_1, tokenSelect_css_1, index_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenSelect = void 0;
    let TokenSelect = class TokenSelect extends components_3.Module {
        constructor(parent, options) {
            super(parent, options);
            this.tokenMap = new Map();
            this.currentToken = '';
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
        get targetChainId() {
            return this._targetChainId;
        }
        set targetChainId(value) {
            this._targetChainId = value;
            this.renderTokenList();
        }
        get chainId() {
            return this.targetChainId || index_2.getChainId();
        }
        renderToken(token) {
            const tokenIconPath = scom_token_list_1.assets.tokenPath(token, this.chainId);
            const isActive = this.token && token.address === this.token.address;
            if (isActive)
                this.currentToken = token.address || '';
            const tokenElm = (this.$render("i-hstack", { width: '100%', class: `pointer token-item ${tokenSelect_css_1.tokenStyle} ${isActive ? ' is-selected' : ''}`, verticalAlignment: 'center', padding: { top: 5, bottom: 5, left: '0.75rem', right: '0.75rem' }, gap: '0.5rem', onClick: () => this.onSelect(token) },
                this.$render("i-vstack", { width: '100%' },
                    this.$render("i-hstack", { gap: '0.5rem', verticalAlignment: 'center' },
                        this.$render("i-hstack", { gap: '0.5rem', verticalAlignment: 'center' },
                            this.$render("i-image", { width: 24, height: 24, url: tokenIconPath, fallbackUrl: scom_token_list_1.assets.fallbackUrl }),
                            this.$render("i-label", { class: "token-symbol", caption: token.symbol }))))));
            this.tokenMap.set(token.address, tokenElm);
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
            this.mdCbToken.visible = !this.mdCbToken.visible;
            this.gridTokenList.scrollTop = 0;
        }
        hideModal() {
            this.mdCbToken.visible = false;
        }
        setActive(token) {
            if (this.currentToken && this.tokenMap.has(this.currentToken))
                this.tokenMap.get(this.currentToken).classList.remove('is-selected');
            if (this.tokenMap.has(token.address))
                this.tokenMap.get(token.address).classList.add('is-selected');
            this.currentToken = token.address;
        }
        async onSelect(token) {
            this.token = token;
            this.setActive(token);
            if (this.onSelectToken)
                this.onSelectToken(Object.assign({}, token));
            this.hideModal();
        }
        init() {
            this.classList.add(tokenSelect_css_1.default);
            super.init();
            this.onSelectToken = this.getAttribute('onSelectToken', true) || this.onSelectToken;
            const chainId = this.getAttribute('chainId', true);
            if (chainId)
                this.targetChainId = chainId;
            this.token = this.getAttribute('token', true);
            const tokens = this.getAttribute('tokenList', true);
            if (tokens)
                this.tokenList = tokens;
        }
        render() {
            return (this.$render("i-panel", null,
                this.$render("i-modal", { id: "mdCbToken", showBackdrop: false, width: '100%', popupPlacement: 'bottom', class: `full-width box-shadow ${tokenSelect_css_1.modalStyle}` },
                    this.$render("i-panel", { margin: { top: '0.25rem' }, padding: { top: 5, bottom: 5 }, overflow: { y: 'auto', x: 'hidden' }, maxWidth: '100%', maxHeight: 300, border: { radius: 2 }, class: tokenSelect_css_1.scrollbarStyle },
                        this.$render("i-grid-layout", { id: 'gridTokenList', width: '100%', columnsPerRow: 1, templateRows: ['max-content'], class: 'is-combobox' })))));
        }
    };
    TokenSelect = __decorate([
        components_3.customElements('token-select')
    ], TokenSelect);
    exports.TokenSelect = TokenSelect;
});
define("@scom/scom-token-input", ["require", "exports", "@ijstech/components", "@scom/scom-token-input/index.css.ts", "@scom/scom-token-input/utils/index.ts", "@scom/scom-token-list"], function (require, exports, components_4, index_css_1, index_3, scom_token_list_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_4.Styles.Theme.ThemeVars;
    let ScomTokenInput = class ScomTokenInput extends components_4.Module {
        constructor(parent, options) {
            super(parent, options);
            this._isCommonShown = false;
            this._isSortBalanceShown = true;
            this._isBtnMaxShown = true;
            this._readonly = false;
            this._tokenReadOnly = false;
            this._importable = false;
            this._isInputShown = true;
            this._isBalanceShown = true;
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
        onRefresh() {
            if (scom_token_list_2.isWalletConnected()) {
                this.tokenBalancesMap = scom_token_list_2.tokenStore.tokenBalances || {};
                if (this.token) {
                    const _tokenList = scom_token_list_2.tokenStore.getTokenList(this.chainId);
                    const token = _tokenList.find((t) => {
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
            this.renderTokenList();
            this.updateStatusButton();
        }
        async onUpdateData() {
            this.tokenBalancesMap = await scom_token_list_2.tokenStore.updateAllTokenBalances();
            this.onRefresh();
        }
        async updateDataByNewToken() {
            this.tokenBalancesMap = scom_token_list_2.tokenStore.tokenBalances || {};
            this.renderTokenList();
        }
        registerEvent() {
            this.$eventBus.register(this, "isWalletConnected" /* IsWalletConnected */, this.onUpdateData);
            this.$eventBus.register(this, "IsWalletDisconnected" /* IsWalletDisconnected */, this.onRefresh);
            this.$eventBus.register(this, "chainChanged" /* chainChanged */, this.onUpdateData);
            this.$eventBus.register(this, "Paid" /* Paid */, this.onUpdateData);
            this.$eventBus.register(this, "EmitNewToken" /* EmitNewToken */, this.updateDataByNewToken);
        }
        get tokenDataList() {
            // let tokenList: ITokenObject[] = this.tokenDataListProp?.length
            //   ? this.tokenDataListProp
            //   : tokenStore.getTokenList(this.chainId)
            let tokenList = scom_token_list_2.tokenStore.getTokenList(this.chainId);
            return tokenList.map((token) => {
                var _a;
                const tokenObject = Object.assign({}, token);
                const nativeToken = scom_token_list_2.ChainNativeTokenByChainId[this.chainId];
                if (token.symbol === nativeToken.symbol) {
                    Object.assign(tokenObject, { isNative: true });
                }
                if (!scom_token_list_2.isWalletConnected()) {
                    Object.assign(tokenObject, { balance: 0 });
                }
                else if (this.tokenBalancesMap && this.chainId === scom_token_list_2.getChainId()) {
                    Object.assign(tokenObject, {
                        balance: this.tokenBalancesMap[((_a = token.address) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || token.symbol] || 0,
                    });
                }
                return tokenObject;
            })
                .sort(this.sortToken);
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
            this.onRefresh();
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
            this.onSelectFn(value);
            if (this.cbToken)
                this.cbToken.token = value;
            if (this.mdToken)
                this.mdToken.token = value;
        }
        get targetChainId() {
            return this._targetChainId;
        }
        set targetChainId(value) {
            this._targetChainId = value;
            if (typeof value === 'number') {
                if (this.cbToken)
                    this.cbToken.targetChainId = value;
                if (this.mdToken)
                    this.mdToken.targetChainId = value;
            }
        }
        get chainId() {
            return this.targetChainId || scom_token_list_2.getChainId();
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
        get readonly() {
            return this._readonly;
        }
        set readonly(value) {
            this._readonly = value;
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
                this.btnToken.enabled = !this._readonly && !value;
                this.btnToken.rightIcon.visible = !this._readonly && !value;
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
        async onSetMax() {
            this.inputAmount.value = this.token ?
                index_3.limitDecimals(await index_3.getTokenBalance(this.token), this.token.decimals || 18)
                : '';
            if (this.onSetMaxBalance)
                this.onSetMaxBalance();
        }
        async onAmountChanged(target, event) {
            if (this.onChanged)
                this.onChanged(target, event);
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
        async renderTokenList() {
            if (this.type === 'combobox') {
                if (!this.cbToken.isConnected)
                    await this.cbToken.ready();
                this.cbToken.tokenList = [...this.tokenDataList];
            }
            else {
                this.mdToken.onRefresh();
            }
        }
        updateStatusButton() {
            const status = scom_token_list_2.isWalletConnected();
            const value = !this.readonly && status;
            if (this.btnToken) {
                this.btnToken.enabled = value && !this.tokenReadOnly;
            }
            if (this.btnMax) {
                this.btnMax.enabled = value;
            }
        }
        updateTokenButton(token) {
            if (!this.btnToken)
                return;
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
                this.btnToken.caption = 'Select a token';
                this.btnMax.visible = false;
            }
        }
        onButtonClicked() {
            if (this.type === 'combobox')
                this.cbToken.showModal();
            else
                this.mdToken.showModal();
        }
        async onSelectFn(token) {
            this._token = token;
            if (!this.inputAmount.isConnected) {
                await this.inputAmount.ready();
                this.inputAmount.value = '';
            }
            if (token) {
                const symbol = (token === null || token === void 0 ? void 0 : token.symbol) || '';
                this.lbBalance.caption = `${(await index_3.getTokenBalance(token)).toFixed(2)} ${symbol}`;
            }
            else {
                this.lbBalance.caption = '0.00';
            }
            this.updateTokenButton(token);
            if (this.onSelectToken)
                this.onSelectToken(token);
        }
        init() {
            this.classList.add(index_css_1.default);
            super.init();
            this.onChanged = this.getAttribute('onChanged', true) || this.onChanged;
            this.onSetMaxBalance = this.getAttribute('onSetMaxBalance', true) || this.onSetMaxBalance;
            this.onSelectToken = this.getAttribute('onSelectToken', true) || this.onSelectToken;
            this.title = this.getAttribute('title', true, '');
            const token = this.getAttribute('token', true);
            if (token)
                this.token = token;
            this.targetChainId = this.getAttribute('chainId', true);
            this.readonly = this.getAttribute('readonly', true, false);
            this.tokenReadOnly = this.getAttribute('tokenReadOnly', true, false);
            this.isBtnMaxShown = this.getAttribute('isBtnMaxShown', true, true);
            this.type = this.getAttribute('type', true, 'button');
            if (this.type === 'button') {
                this.isCommonShown = this.getAttribute('isCommonShown', true, false);
                this.isSortBalanceShown = this.getAttribute('isSortBalanceShown', true, true);
                this.importable = this.getAttribute('importable', true, false);
            }
            this.isInputShown = this.getAttribute('isInputShown', true, true);
            this.isBalanceShown = this.getAttribute('isBalanceShown', true, true);
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
            return (this.$render("i-panel", { width: '100%' },
                this.$render("i-vstack", { gap: '0.5rem' },
                    this.$render("i-hstack", { horizontalAlignment: 'space-between', verticalAlignment: 'center', gap: '0.5rem' },
                        this.$render("i-hstack", { id: "pnlTitle", gap: "4px" }),
                        this.$render("i-hstack", { id: "pnlBalance", horizontalAlignment: 'end', verticalAlignment: 'center', gap: '0.5rem', opacity: 0.6 },
                            this.$render("i-label", { caption: 'Balance:', font: { size: '0.875rem' } }),
                            this.$render("i-label", { id: 'lbBalance', font: { size: '0.875rem' }, caption: "0" }))),
                    this.$render("i-grid-layout", { id: 'gridTokenInput', templateColumns: ['50%', 'auto'], background: { color: Theme.input.background }, font: { color: Theme.input.fontColor }, verticalAlignment: 'center', lineHeight: 1.5715, padding: { top: 4, bottom: 4, left: 11, right: 11 }, gap: { column: '0.5rem' } },
                        this.$render("i-input", { id: 'inputAmount', width: '100%', height: '100%', minHeight: 34, class: index_css_1.inputStyle, inputType: 'number', font: { size: '0.875rem' }, placeholder: 'Enter an amount', onChanged: this.onAmountChanged.bind(this) }),
                        this.$render("i-panel", { id: "pnlSelection", width: '100%', class: index_css_1.tokenSelectionStyle },
                            this.$render("i-hstack", { verticalAlignment: "center", horizontalAlignment: "end", gap: "0.25rem" },
                                this.$render("i-button", { id: 'btnMax', visible: false, caption: 'Max', height: '100%', background: { color: Theme.colors.success.main }, font: { color: Theme.colors.success.contrastText }, padding: {
                                        top: '0.25rem',
                                        bottom: '0.25rem',
                                        left: '0.5rem',
                                        right: '0.5rem',
                                    }, onClick: () => this.onSetMax() }),
                                this.$render("i-button", { id: 'btnToken', class: `${index_css_1.buttonStyle}`, height: '100%', caption: 'Select a token', rightIcon: { width: 14, height: 14, name: 'angle-down' }, border: { radius: 0 }, background: { color: 'transparent' }, font: { color: Theme.input.fontColor }, padding: {
                                        top: '0.25rem',
                                        bottom: '0.25rem',
                                        left: '0.5rem',
                                        right: '0.5rem',
                                    }, onClick: this.onButtonClicked.bind(this) })),
                            this.$render("token-select", { id: "cbToken", width: '100%', onSelectToken: this.onSelectFn.bind(this) }),
                            this.$render("i-scom-token-modal", { id: "mdToken", width: '100%', onSelectToken: this.onSelectFn.bind(this) }))))));
        }
    };
    ScomTokenInput = __decorate([
        components_4.customModule,
        components_4.customElements('i-scom-token-input')
    ], ScomTokenInput);
    exports.default = ScomTokenInput;
});

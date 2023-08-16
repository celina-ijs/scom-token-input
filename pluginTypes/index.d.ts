/// <reference path="@ijstech/eth-wallet/index.d.ts" />
/// <reference path="@scom/scom-token-modal/@ijstech/eth-wallet/index.d.ts" />
/// <amd-module name="@scom/scom-token-input/index.css.ts" />
declare module "@scom/scom-token-input/index.css.ts" {
    export const imageStyle: string;
    export const markdownStyle: string;
    export const inputStyle: string;
    export const tokenSelectionStyle: string;
    export const buttonStyle: string;
    const _default: string;
    export default _default;
}
/// <amd-module name="@scom/scom-token-input/global/index.ts" />
declare module "@scom/scom-token-input/global/index.ts" {
    export const enum EventId {
        ConnectWallet = "connectWallet",
        IsWalletConnected = "isWalletConnected",
        chainChanged = "chainChanged",
        IsWalletDisconnected = "IsWalletDisconnected",
        EmitNewToken = "EmitNewToken",
        Paid = "Paid"
    }
    export type IType = 'button' | 'combobox';
}
/// <amd-module name="@scom/scom-token-input/utils/index.ts" />
declare module "@scom/scom-token-input/utils/index.ts" {
    export const formatNumber: (value: any, decimals?: number) => string;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export const limitDecimals: (value: any, decimals: number) => any;
}
/// <amd-module name="@scom/scom-token-input/tokenSelect.css.ts" />
declare module "@scom/scom-token-input/tokenSelect.css.ts" {
    export const scrollbarStyle: string;
    export const tokenStyle: string;
    export const modalStyle: string;
    const _default_1: string;
    export default _default_1;
}
/// <amd-module name="@scom/scom-token-input/store/index.ts" />
declare module "@scom/scom-token-input/store/index.ts" {
    export const getNetworkInfo: (chainId: number) => any;
    export const viewOnExplorerByAddress: (chainId: number, address: string) => void;
    export const updateStore: (data: any) => void;
    export const getRpcWallet: () => import("@ijstech/eth-wallet").IRpcWallet;
    export function isRpcWalletConnected(): boolean;
    export function getChainId(): number;
}
/// <amd-module name="@scom/scom-token-input/tokenSelect.tsx" />
declare module "@scom/scom-token-input/tokenSelect.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { ITokenObject } from '@scom/scom-token-list';
    interface TokenSelectElement extends ControlElement {
        chainId?: number;
        token?: ITokenObject;
        tokenList?: ITokenObject[];
        onSelectToken?: (token: ITokenObject | undefined) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['token-select']: TokenSelectElement;
            }
        }
    }
    export class TokenSelect extends Module {
        private _token?;
        private _tokenList;
        private _targetChainId;
        private tokenMap;
        private currentToken;
        private mapScrollTop;
        private mdCbToken;
        private gridTokenList;
        private wrapper;
        onSelectToken: (token: ITokenObject | undefined) => void;
        constructor(parent?: Container, options?: any);
        get token(): ITokenObject | undefined;
        set token(value: ITokenObject | undefined);
        get tokenList(): Array<ITokenObject>;
        set tokenList(value: Array<ITokenObject>);
        get chainId(): number;
        get targetChainId(): number;
        set targetChainId(value: number);
        private renderToken;
        private clearTokenList;
        private renderTokenList;
        showModal(): void;
        hideModal(): void;
        private hideModalWrapper;
        private setActive;
        private onSelect;
        private generateUUID;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-token-input" />
declare module "@scom/scom-token-input" {
    import { ControlElement, Module, Container, Control } from '@ijstech/components';
    import { IType } from "@scom/scom-token-input/global/index.ts";
    import { ITokenObject } from '@scom/scom-token-list';
    interface ScomTokenInputElement extends ControlElement {
        type?: IType;
        title?: string;
        rpcWalletId?: string;
        token?: ITokenObject;
        tokenDataListProp?: ITokenObject[];
        readOnly?: boolean;
        tokenReadOnly?: boolean;
        inputReadOnly?: boolean;
        withoutConnected?: boolean;
        importable?: boolean;
        isSortBalanceShown?: boolean;
        isBtnMaxShown?: boolean;
        isCommonShown?: boolean;
        isInputShown?: boolean;
        isBalanceShown?: boolean;
        value?: any;
        placeholder?: string;
        address?: string;
        targetChainId?: number;
        onInputAmountChanged?: (target: Control, event: Event) => void;
        onSelectToken?: (token: ITokenObject | undefined) => void;
        onSetMaxBalance?: () => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-token-input']: ScomTokenInputElement;
            }
        }
    }
    export default class ScomTokenInput extends Module {
        private gridTokenInput;
        private inputAmount;
        private lbBalance;
        private pnlTitle;
        private pnlBalance;
        private mdToken;
        private cbToken;
        private btnMax;
        private btnToken;
        private pnlTopSection;
        private $eventBus;
        private _type;
        private _token;
        private _title;
        private _isCommonShown;
        private _isSortBalanceShown;
        private _isBtnMaxShown;
        private _readOnly;
        private _tokenReadOnly;
        private _inputReadOnly;
        private _importable;
        private _isInputShown;
        private _isBalanceShown;
        private _tokenDataListProp;
        private _withoutConnected;
        private _rpcWalletId;
        private _targetChainId;
        private tokenBalancesMap;
        onChanged: (token?: ITokenObject) => void;
        private walletEvents;
        private clientEvents;
        onInputAmountChanged: (target: Control, event: Event) => void;
        private _onSelectToken;
        onSetMaxBalance: () => void;
        constructor(parent?: Container, options?: ScomTokenInputElement);
        static create(options?: ScomTokenInputElement, parent?: Container): Promise<ScomTokenInput>;
        private onRefresh;
        private updateDataByNewToken;
        private onUpdateData;
        private registerEvent;
        onHide(): void;
        get tokenDataListProp(): Array<ITokenObject>;
        set tokenDataListProp(value: Array<ITokenObject>);
        private get tokenListByChainId();
        private get tokenDataList();
        private sortToken;
        get onSelectToken(): any;
        set onSelectToken(callback: any);
        get type(): IType;
        set type(value: IType);
        get title(): any;
        set title(value: string | Control);
        get token(): ITokenObject | undefined;
        set token(value: ITokenObject | undefined);
        set address(value: string);
        get chainId(): number;
        get isCommonShown(): boolean;
        set isCommonShown(value: boolean);
        get isSortBalanceShown(): boolean;
        set isSortBalanceShown(value: boolean);
        get isBtnMaxShown(): boolean;
        set isBtnMaxShown(value: boolean);
        get readOnly(): boolean;
        set readOnly(value: boolean);
        get tokenReadOnly(): boolean;
        set tokenReadOnly(value: boolean);
        get inputReadOnly(): boolean;
        set inputReadOnly(value: boolean);
        get importable(): boolean;
        set importable(value: boolean);
        get isInputShown(): boolean;
        set isInputShown(value: boolean);
        get isBalanceShown(): boolean;
        set isBalanceShown(value: boolean);
        get amount(): string;
        get rpcWalletId(): string;
        set rpcWalletId(value: string);
        get placeholder(): string;
        set placeholder(value: string);
        get value(): any;
        set value(value: any);
        get targetChainId(): number;
        set targetChainId(value: number);
        private getBalance;
        private onSetMax;
        private onAmountChanged;
        private onToggleFocus;
        _handleFocus(event: Event): boolean;
        private renderTokenList;
        private updateTokenUI;
        private updateBalance;
        private updateStatusButton;
        private updateTokenButton;
        private onButtonClicked;
        private onSelectFn;
        init(): void;
        render(): any;
    }
}

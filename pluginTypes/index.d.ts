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
    export interface ITokenObject {
        address?: string;
        name: string;
        decimals: number;
        symbol: string;
        status?: boolean | null;
        logoURI?: string;
        isCommon?: boolean | null;
        balance?: string | number;
        isNative?: boolean | null;
        isWETH?: boolean | null;
        isNew?: boolean | null;
    }
    export type IType = 'button' | 'combobox';
}
/// <amd-module name="@scom/scom-token-input/store/index.ts" />
declare module "@scom/scom-token-input/store/index.ts" {
    export function getChainId(): number;
    export const getNetworkInfo: (chainId: number) => any;
    export const viewOnExplorerByAddress: (chainId: number, address: string) => void;
}
/// <amd-module name="@scom/scom-token-input/utils/token.ts" />
declare module "@scom/scom-token-input/utils/token.ts" {
    import { BigNumber, IWallet } from "@ijstech/eth-wallet";
    import { ITokenObject } from "@scom/scom-token-input/global/index.ts";
    export const getERC20Amount: (wallet: IWallet, tokenAddress: string, decimals: number) => Promise<BigNumber>;
    export const getTokenBalance: (token: ITokenObject) => Promise<BigNumber>;
}
/// <amd-module name="@scom/scom-token-input/utils/index.ts" />
declare module "@scom/scom-token-input/utils/index.ts" {
    export const formatNumber: (value: any, decimals?: number) => string;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export const limitDecimals: (value: any, decimals: number) => any;
    export { getERC20Amount, getTokenBalance } from "@scom/scom-token-input/utils/token.ts";
}
/// <amd-module name="@scom/scom-token-input/tokenSelect.css.ts" />
declare module "@scom/scom-token-input/tokenSelect.css.ts" {
    export const scrollbarStyle: string;
    export const tokenStyle: string;
    export const modalStyle: string;
    const _default_1: string;
    export default _default_1;
}
/// <amd-module name="@scom/scom-token-input/tokenSelect.tsx" />
declare module "@scom/scom-token-input/tokenSelect.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { ITokenObject } from "@scom/scom-token-input/global/index.ts";
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
        private mdCbToken;
        private gridTokenList;
        onSelectToken: (token: ITokenObject | undefined) => void;
        constructor(parent?: Container, options?: any);
        get token(): ITokenObject | undefined;
        set token(value: ITokenObject | undefined);
        get tokenList(): Array<ITokenObject>;
        set tokenList(value: Array<ITokenObject>);
        get targetChainId(): number;
        set targetChainId(value: number);
        get chainId(): number;
        private renderToken;
        private clearTokenList;
        private renderTokenList;
        showModal(): void;
        hideModal(): void;
        private setActive;
        private onSelect;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-token-input" />
declare module "@scom/scom-token-input" {
    import { ControlElement, Module, Container, Control } from '@ijstech/components';
    import { ITokenObject, IType } from "@scom/scom-token-input/global/index.ts";
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
        private $eventBus;
        private _type;
        private _targetChainId;
        private _token;
        private _title;
        private _isCommonShown;
        private _isSortBalanceShown;
        private _isBtnMaxShown;
        private _readonly;
        private _importable;
        private _isInputShown;
        private _isBalanceShown;
        private tokenBalancesMap;
        onChanged: (target: Control, event: Event) => void;
        onSelectToken: (token: ITokenObject | undefined) => void;
        onSetMaxBalance: () => void;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomTokenInputElement, parent?: Container): Promise<ScomTokenInput>;
        private onRefresh;
        private onUpdateData;
        private updateDataByNewToken;
        private registerEvent;
        private get tokenDataList();
        private sortToken;
        get type(): IType;
        set type(value: IType);
        get title(): any;
        set title(value: string | Control);
        get token(): ITokenObject | undefined;
        set token(value: ITokenObject | undefined);
        get targetChainId(): number;
        set targetChainId(value: number);
        get chainId(): number;
        get isCommonShown(): boolean;
        set isCommonShown(value: boolean);
        get isSortBalanceShown(): boolean;
        set isSortBalanceShown(value: boolean);
        get isBtnMaxShown(): boolean;
        set isBtnMaxShown(value: boolean);
        get readonly(): boolean;
        set readonly(value: boolean);
        get importable(): boolean;
        set importable(value: boolean);
        get isInputShown(): boolean;
        set isInputShown(value: boolean);
        get isBalanceShown(): boolean;
        set isBalanceShown(value: boolean);
        onSetMax(): Promise<void>;
        private onAmountChanged;
        private onToggleFocus;
        _handleFocus(event: Event): boolean;
        private renderTokenList;
        private updateStatusButton;
        private updateTokenButton;
        private onButtonClicked;
        private onSelectFn;
        init(): void;
        render(): any;
    }
}

/// <amd-module name="@scom/scom-token-input/index.css.ts" />
declare module "@scom/scom-token-input/index.css.ts" {
    export const imageStyle: string;
    export const markdownStyle: string;
    export const inputStyle: string;
    export const tokenSelectionStyle: string;
    const _default: string;
    export default _default;
}
/// <amd-module name="@scom/scom-token-input/global/index.ts" />
declare module "@scom/scom-token-input/global/index.ts" {
    export interface INetwork {
        chainId: number;
        name: string;
        img?: string;
        rpc?: string;
        symbol?: string;
        env?: string;
        explorerName?: string;
        explorerTxUrl?: string;
        explorerAddressUrl?: string;
        isDisabled?: boolean;
    }
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
    export type TokenMapType = {
        [token: string]: ITokenObject;
    };
    export enum SITE_ENV {
        DEV = "dev",
        TESTNET = "testnet",
        MAINNET = "mainnet"
    }
    export type IType = 'button' | 'combobox';
}
/// <amd-module name="@scom/scom-token-input/store/tokens/mainnet/avalanche.ts" />
declare module "@scom/scom-token-input/store/tokens/mainnet/avalanche.ts" {
    export const Tokens_Avalanche: ({
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        name: string;
        symbol: string;
        address: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    } | {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/mainnet/ethereum.ts" />
declare module "@scom/scom-token-input/store/tokens/mainnet/ethereum.ts" {
    export const Tokens_Ethereuem: ({
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    } | {
        name: string;
        symbol: string;
        address: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/mainnet/polygon.ts" />
declare module "@scom/scom-token-input/store/tokens/mainnet/polygon.ts" {
    export const Tokens_Polygon: ({
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    } | {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/mainnet/bsc.ts" />
declare module "@scom/scom-token-input/store/tokens/mainnet/bsc.ts" {
    export const Tokens_BSC: ({
        name: string;
        symbol: string;
        address: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    } | {
        name: string;
        symbol: string;
        address: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    } | {
        name: string;
        symbol: string;
        address: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/mainnet/fantom.ts" />
declare module "@scom/scom-token-input/store/tokens/mainnet/fantom.ts" {
    export const Tokens_Fantom: ({
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    } | {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/mainnet/cronos.ts" />
declare module "@scom/scom-token-input/store/tokens/mainnet/cronos.ts" {
    export const Tokens_Cronos: ({
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/mainnet/index.ts" />
declare module "@scom/scom-token-input/store/tokens/mainnet/index.ts" {
    export { Tokens_Avalanche } from "@scom/scom-token-input/store/tokens/mainnet/avalanche.ts";
    export { Tokens_Ethereuem } from "@scom/scom-token-input/store/tokens/mainnet/ethereum.ts";
    export { Tokens_Polygon } from "@scom/scom-token-input/store/tokens/mainnet/polygon.ts";
    export { Tokens_BSC } from "@scom/scom-token-input/store/tokens/mainnet/bsc.ts";
    export { Tokens_Fantom } from "@scom/scom-token-input/store/tokens/mainnet/fantom.ts";
    export { Tokens_Cronos } from "@scom/scom-token-input/store/tokens/mainnet/cronos.ts";
}
/// <amd-module name="@scom/scom-token-input/store/tokens/testnet/kovan.ts" />
declare module "@scom/scom-token-input/store/tokens/testnet/kovan.ts" {
    export const Tokens_Kovan: ({
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
        isVaultToken?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
        isVaultToken?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isVaultToken: boolean;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
        isVaultToken?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/testnet/bsc-testnet.ts" />
declare module "@scom/scom-token-input/store/tokens/testnet/bsc-testnet.ts" {
    export const Tokens_BSC_Testnet: ({
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/testnet/fuji.ts" />
declare module "@scom/scom-token-input/store/tokens/testnet/fuji.ts" {
    export const Tokens_Fuji: ({
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/testnet/mumbai.ts" />
declare module "@scom/scom-token-input/store/tokens/testnet/mumbai.ts" {
    export const Tokens_Mumbai: ({
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/testnet/fantom-testnet.ts" />
declare module "@scom/scom-token-input/store/tokens/testnet/fantom-testnet.ts" {
    export const Tokens_Fantom_Testnet: ({
        address: string;
        decimals: number;
        name: string;
        symbol: string;
        isWETH: boolean;
        isCommon?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/testnet/amino.ts" />
declare module "@scom/scom-token-input/store/tokens/testnet/amino.ts" {
    export const Tokens_Amino: ({
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/testnet/aminoX-testnet.ts" />
declare module "@scom/scom-token-input/store/tokens/testnet/aminoX-testnet.ts" {
    export const Tokens_AminoXTestnet: ({
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/testnet/cronos-testnet.ts" />
declare module "@scom/scom-token-input/store/tokens/testnet/cronos-testnet.ts" {
    export const Tokens_Cronos_Testnet: ({
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-input/store/tokens/testnet/index.ts" />
declare module "@scom/scom-token-input/store/tokens/testnet/index.ts" {
    export { Tokens_Kovan } from "@scom/scom-token-input/store/tokens/testnet/kovan.ts";
    export { Tokens_BSC_Testnet } from "@scom/scom-token-input/store/tokens/testnet/bsc-testnet.ts";
    export { Tokens_Fuji } from "@scom/scom-token-input/store/tokens/testnet/fuji.ts";
    export { Tokens_Mumbai } from "@scom/scom-token-input/store/tokens/testnet/mumbai.ts";
    export { Tokens_Fantom_Testnet } from "@scom/scom-token-input/store/tokens/testnet/fantom-testnet.ts";
    export { Tokens_Amino } from "@scom/scom-token-input/store/tokens/testnet/amino.ts";
    export { Tokens_AminoXTestnet } from "@scom/scom-token-input/store/tokens/testnet/aminoX-testnet.ts";
    export { Tokens_Cronos_Testnet } from "@scom/scom-token-input/store/tokens/testnet/cronos-testnet.ts";
}
/// <amd-module name="@scom/scom-token-input/store/tokens/index.ts" />
declare module "@scom/scom-token-input/store/tokens/index.ts" {
    import { ITokenObject } from "@scom/scom-token-input/global/index.ts";
    const DefaultERC20Tokens: {
        [chainId: number]: ITokenObject[];
    };
    const ChainNativeTokenByChainId: {
        [chainId: number]: ITokenObject;
    };
    const DefaultTokens: {
        [chainId: number]: ITokenObject[];
    };
    const CoreContractAddressesByChainId: {
        [chainId: number]: {
            [contract: string]: string;
        };
    };
    export { DefaultERC20Tokens, ChainNativeTokenByChainId, DefaultTokens, CoreContractAddressesByChainId };
}
/// <amd-module name="@scom/scom-token-input/store/utils.ts" />
declare module "@scom/scom-token-input/store/utils.ts" {
    import { INetwork, ITokenObject, SITE_ENV } from "@scom/scom-token-input/global/index.ts";
    export const state: {
        currentChainId: number;
        userTokens: {
            [key: string]: ITokenObject[];
        };
        siteEnv: SITE_ENV;
        infuraId: string;
        networkMap: {
            [key: number]: INetwork;
        };
    };
    export function isWalletConnected(): boolean;
    export const getChainId: () => number;
    export const hasMetaMask: () => boolean;
    export const setUserTokens: (token: ITokenObject, chainId: number) => void;
    export const hasUserToken: (address: string, chainId: number) => boolean;
    export const setSiteEnv: (value: string) => void;
    export const getSiteEnv: () => SITE_ENV;
    export const getDefaultChainId: () => 97 | 56;
    export const getUserTokens: (chainId: number) => any[] | null;
    export function getAddresses(chainId: number): {
        [contract: string]: string;
    };
    export const getGovToken: (chainId: number) => ITokenObject;
    export const getChainNativeToken: (chainId: number) => ITokenObject;
    export const addUserTokens: (token: ITokenObject) => void;
    export const getNetworkInfo: (chainId: number) => any;
    export const viewOnExplorerByAddress: (chainId: number, address: string) => void;
}
/// <amd-module name="@scom/scom-token-input/store/token.ts" />
declare module "@scom/scom-token-input/store/token.ts" {
    import { ITokenObject, TokenMapType } from "@scom/scom-token-input/global/index.ts";
    export type DefaultTokensByChainType = Record<number, ITokenObject[]>;
    export type TokenBalancesType = Record<string, string>;
    export class TokenStore {
        private _defaultTokensByChain;
        private _tokenBalances;
        private _tokenMap;
        private _projectToken?;
        private _govToken?;
        constructor(defaultTokensByChain: DefaultTokensByChainType);
        get tokenBalances(): TokenBalancesType;
        get tokenMap(): TokenMapType;
        get projectToken(): ITokenObject;
        get govToken(): ITokenObject;
        getTokenList(chainId: number): ITokenObject[];
        private getERC20Balance;
        getTokenBalance(token: ITokenObject): string;
        getProjectTokenBalance(): string;
        private _updateAllTokenBalances;
        updateAllTokenBalances(): Promise<TokenBalancesType>;
        updateTokenBalances(erc20TokenList: ITokenObject[]): Promise<TokenBalancesType>;
        private _updateTokenMapData;
        updateTokenMapData(): TokenMapType;
    }
}
/// <amd-module name="@scom/scom-token-input/store/index.ts" />
declare module "@scom/scom-token-input/store/index.ts" {
    import { TokenStore } from "@scom/scom-token-input/store/token.ts";
    export let tokenStore: TokenStore;
    export const setTokenStore: () => void;
    export { DefaultERC20Tokens, ChainNativeTokenByChainId, DefaultTokens, CoreContractAddressesByChainId } from "@scom/scom-token-input/store/tokens/index.ts";
    export * from "@scom/scom-token-input/store/utils.ts";
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
    export { getERC20Amount, getTokenBalance } from "@scom/scom-token-input/utils/token.ts";
}
/// <amd-module name="@scom/scom-token-input/assets.ts" />
declare module "@scom/scom-token-input/assets.ts" {
    import { ITokenObject } from "@scom/scom-token-input/global/index.ts";
    function fullPath(path: string): string;
    function tokenPath(tokenObj?: ITokenObject, chainId?: number): string;
    const _default_1: {
        fonts: {
            poppins: {
                bold: string;
                italic: string;
                light: string;
                medium: string;
                regular: string;
                thin: string;
            };
        };
        img: {
            network: {
                bsc: string;
                eth: string;
                amio: string;
                avax: string;
                ftm: string;
                polygon: string;
            };
            wallet: {
                metamask: string;
                trustwallet: string;
                binanceChainWallet: string;
                walletconnect: string;
            };
        };
        fullPath: typeof fullPath;
        tokenPath: typeof tokenPath;
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-token-input/tokenSelection.css.ts" />
declare module "@scom/scom-token-input/tokenSelection.css.ts" {
    export const scrollbarStyle: string;
    export const buttonStyle: string;
    export const tokenStyle: string;
    export const modalStyle: string;
    const _default_2: string;
    export default _default_2;
}
/// <amd-module name="@scom/scom-token-input/importToken.tsx" />
declare module "@scom/scom-token-input/importToken.tsx" {
    import { Control, ControlElement, Module, Container } from '@ijstech/components';
    import { ITokenObject } from "@scom/scom-token-input/global/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['import-token']: ControlElement;
            }
        }
    }
    export class ImportToken extends Module {
        private importModal;
        private importBtn;
        private tokenAgreeCheckBox;
        private _token;
        private $eventBus;
        onUpdate: any;
        private _state;
        constructor(parent?: Container, options?: any);
        set token(value: ITokenObject);
        get token(): ITokenObject;
        updateState(): void;
        closeModal(): void;
        showModal(): void;
        onImportToken(source: Control, event: Event): Promise<void>;
        onHandleCheck(source: Control, event: Event): void;
        viewContract(): void;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-token-input/tokenSelection.tsx" />
declare module "@scom/scom-token-input/tokenSelection.tsx" {
    import { Module, Control, ControlElement, Container } from '@ijstech/components';
    import { ITokenObject, IType } from "@scom/scom-token-input/global/index.ts";
    import "@scom/scom-token-input/tokenSelection.css.ts";
    interface TokenSelectionElement extends ControlElement {
        onSelectToken?: (token: ITokenObject) => void;
        onSetMaxBalance?: () => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['token-selection']: TokenSelectionElement;
            }
        }
    }
    export class TokenSelection extends Module {
        private _token?;
        private _targetChainId;
        private _tokenDataListProp;
        private _isCommonShown;
        private _isSortBalanceShown;
        private tokenBalancesMap;
        private fallbackUrl;
        private _title;
        private _type;
        private mdTokenSelection;
        private btnToken;
        private btnMax;
        private gridTokenList;
        private gridCommonToken;
        private pnlCommonToken;
        private pnlSortBalance;
        private mdImportToken;
        private titleStack;
        private pnlSelection;
        private sortValue;
        private iconSortUp;
        private iconSortDown;
        private inputSearch;
        private filterValue;
        private checkHasMetaMask;
        private $eventBus;
        private _readonly;
        private _disabledMaxBtn;
        private _importable;
        private _isBtnMaxShown;
        onSelectToken: (token: ITokenObject) => void;
        onSetMaxBalance: () => void;
        constructor(parent?: Container, options?: any);
        get token(): ITokenObject | undefined;
        set token(value: ITokenObject | undefined);
        get targetChainId(): number;
        set targetChainId(value: number);
        get chainId(): number;
        get tokenDataListProp(): Array<ITokenObject>;
        set tokenDataListProp(value: Array<ITokenObject>);
        get isCommonShown(): boolean;
        set isCommonShown(value: boolean);
        get isSortBalanceShown(): boolean;
        set isSortBalanceShown(value: boolean);
        get readonly(): boolean;
        set readonly(value: boolean);
        get disabledMaxBtn(): boolean;
        set disabledMaxBtn(value: boolean);
        get importable(): boolean;
        set importable(value: boolean);
        get isBtnMaxShown(): boolean;
        set isBtnMaxShown(value: boolean);
        get title(): any;
        set title(value: string | Control);
        get type(): IType;
        set type(value: IType);
        private renderUI;
        private onRefresh;
        private renderButton;
        private renderCombobox;
        private updateDataByChain;
        private updateDataByNewToken;
        private onWalletConnect;
        private onWalletDisconnect;
        private onPaid;
        private registerEvent;
        private get tokenDataList();
        private get commonTokenDataList();
        private get tokenDataListFiltered();
        private sortToken;
        private sortBalance;
        private onSearch;
        private renderCommonItems;
        private renderToken;
        private getTokenObject;
        private clearTokenList;
        private renderTokenList;
        private addToMetamask;
        private showModal;
        private updateStatusButton;
        private updateTokenButton;
        private onSelect;
        init(): Promise<void>;
        showImportTokenModal(target: Control, event: Event, token: ITokenObject): void;
        onImportToken(target: Control, token: ITokenObject): void;
        onCloseModal(): void;
        onOpenModal(): void;
        closeModal(): void;
        onSetMaxBalanceFn(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-token-input" />
declare module "@scom/scom-token-input" {
    import { ControlElement, Module, Container, Control } from '@ijstech/components';
    import { ITokenObject, IType } from "@scom/scom-token-input/global/index.ts";
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
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-token-input']: TokenElement;
            }
        }
    }
    export default class ScomTokenInput extends Module {
        private tokenSelection;
        private gridTokenInput;
        private inputAmount;
        private lbBalance;
        private lbTitle;
        private _type;
        private _chainId;
        private _token;
        private _title;
        private _isCommonShown;
        private _isSortBalanceShown;
        private _isBtnMaxShown;
        private _readonly;
        private _importable;
        private _onChanged;
        private _onSetMaxBalance;
        constructor(parent?: Container, options?: any);
        get type(): IType;
        set type(value: IType);
        get title(): string;
        set title(value: string);
        get token(): ITokenObject | undefined;
        set token(value: ITokenObject | undefined);
        get chainId(): number;
        set chainId(value: number);
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
        get onSetMaxBalance(): any;
        set onSetMaxBalance(callback: any);
        get onChanged(): any;
        set onChanged(callback: any);
        private onAmountChanged;
        private onToggleFocus;
        private onSelectToken;
        _handleFocus(event: Event): boolean;
        init(): void;
        render(): any;
    }
}

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
/// <amd-module name="@scom/scom-token-input/scom-token-list/interface.ts" />
declare module "@scom/scom-token-input/scom-token-list/interface.ts" {
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
}
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/mainnet/avalanche.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/mainnet/avalanche.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/mainnet/ethereum.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/mainnet/ethereum.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/mainnet/polygon.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/mainnet/polygon.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/mainnet/bsc.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/mainnet/bsc.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/mainnet/fantom.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/mainnet/fantom.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/mainnet/cronos.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/mainnet/cronos.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/mainnet/index.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/mainnet/index.ts" {
    export { Tokens_Avalanche } from "@scom/scom-token-input/scom-token-list/tokens/mainnet/avalanche.ts";
    export { Tokens_Ethereuem } from "@scom/scom-token-input/scom-token-list/tokens/mainnet/ethereum.ts";
    export { Tokens_Polygon } from "@scom/scom-token-input/scom-token-list/tokens/mainnet/polygon.ts";
    export { Tokens_BSC } from "@scom/scom-token-input/scom-token-list/tokens/mainnet/bsc.ts";
    export { Tokens_Fantom } from "@scom/scom-token-input/scom-token-list/tokens/mainnet/fantom.ts";
    export { Tokens_Cronos } from "@scom/scom-token-input/scom-token-list/tokens/mainnet/cronos.ts";
}
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/testnet/bsc-testnet.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/testnet/bsc-testnet.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/testnet/fuji.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/testnet/fuji.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/testnet/mumbai.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/testnet/mumbai.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/testnet/fantom-testnet.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/testnet/fantom-testnet.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/testnet/amino.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/testnet/amino.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/testnet/aminoX-testnet.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/testnet/aminoX-testnet.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/testnet/cronos-testnet.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/testnet/cronos-testnet.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/testnet/index.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/testnet/index.ts" {
    export { Tokens_BSC_Testnet } from "@scom/scom-token-input/scom-token-list/tokens/testnet/bsc-testnet.ts";
    export { Tokens_Fuji } from "@scom/scom-token-input/scom-token-list/tokens/testnet/fuji.ts";
    export { Tokens_Mumbai } from "@scom/scom-token-input/scom-token-list/tokens/testnet/mumbai.ts";
    export { Tokens_Fantom_Testnet } from "@scom/scom-token-input/scom-token-list/tokens/testnet/fantom-testnet.ts";
    export { Tokens_Amino } from "@scom/scom-token-input/scom-token-list/tokens/testnet/amino.ts";
    export { Tokens_AminoXTestnet } from "@scom/scom-token-input/scom-token-list/tokens/testnet/aminoX-testnet.ts";
    export { Tokens_Cronos_Testnet } from "@scom/scom-token-input/scom-token-list/tokens/testnet/cronos-testnet.ts";
}
/// <amd-module name="@scom/scom-token-input/scom-token-list/tokens/index.ts" />
declare module "@scom/scom-token-input/scom-token-list/tokens/index.ts" {
    import { ITokenObject } from "@scom/scom-token-input/scom-token-list/interface.ts";
    const DefaultERC20Tokens: {
        [chainId: number]: ITokenObject[];
    };
    const ChainNativeTokenByChainId: {
        [chainId: number]: ITokenObject;
    };
    const WETHByChainId: {
        [chainId: number]: ITokenObject;
    };
    const getOpenSwapToken: (chainId: number) => ITokenObject;
    const DefaultTokens: {
        [chainId: number]: ITokenObject[];
    };
    const ToUSDPriceFeedAddressesMap: {
        [chainId: number]: {
            [token: string]: string;
        };
    };
    const tokenPriceAMMReference: {
        [chainId: number]: {
            [token: string]: string;
        };
    };
    export { DefaultERC20Tokens, ChainNativeTokenByChainId, WETHByChainId, DefaultTokens, ToUSDPriceFeedAddressesMap, tokenPriceAMMReference, getOpenSwapToken };
}
/// <amd-module name="@scom/scom-token-input/scom-token-list/utils.ts" />
declare module "@scom/scom-token-input/scom-token-list/utils.ts" {
    import { ITokenObject } from "@scom/scom-token-input/scom-token-list/interface.ts";
    export enum WalletPlugin {
        MetaMask = "metamask",
        WalletConnect = "walletconnect"
    }
    export const state: {
        userTokens: {
            [key: string]: ITokenObject[];
        };
    };
    export function isWalletConnected(): boolean;
    export function getChainId(): number;
    export const hasMetaMask: () => boolean;
    export const setUserTokens: (token: ITokenObject, chainId: number) => void;
    export const hasUserToken: (address: string, chainId: number) => boolean;
    export const getUserTokens: (chainId: number) => any[] | null;
    export const addUserTokens: (token: ITokenObject) => void;
    export const getChainNativeToken: (chainId: number) => ITokenObject;
}
/// <amd-module name="@scom/scom-token-input/scom-token-list/token.ts" />
declare module "@scom/scom-token-input/scom-token-list/token.ts" {
    import { ITokenObject, TokenMapType } from "@scom/scom-token-input/scom-token-list/interface.ts";
    export type DefaultTokensByChainType = Record<number, ITokenObject[]>;
    export type TokenBalancesType = Record<string, string>;
    export class TokenStore {
        private _defaultTokensByChain;
        private _tokenBalances;
        private _tokenMap;
        constructor(defaultTokensByChain: DefaultTokensByChainType);
        get tokenBalances(): TokenBalancesType;
        get tokenMap(): TokenMapType;
        getTokenList(chainId: number): ITokenObject[];
        private getERC20Balance;
        getTokenBalance(token: ITokenObject): string;
        private _updateAllTokenBalances;
        updateAllTokenBalances(): Promise<TokenBalancesType>;
        updateTokenBalances(erc20TokenList: ITokenObject[]): Promise<TokenBalancesType>;
        private _updateTokenMapData;
        updateTokenMapData(): TokenMapType;
    }
}
/// <amd-module name="@scom/scom-token-input/scom-token-list/assets.ts" />
declare module "@scom/scom-token-input/scom-token-list/assets.ts" {
    import { ITokenObject } from "@scom/scom-token-input/scom-token-list/interface.ts";
    function fullPath(path: string): string;
    function tokenPath(tokenObj?: ITokenObject, chainId?: number): string;
    const _default_1: {
        fullPath: typeof fullPath;
        tokenPath: typeof tokenPath;
        fallbackUrl: string;
    };
    export default _default_1;
}
/// <amd-module name="@scom/scom-token-input/scom-token-list/index.ts" />
declare module "@scom/scom-token-input/scom-token-list/index.ts" {
    import { TokenStore } from "@scom/scom-token-input/scom-token-list/token.ts";
    import { hasMetaMask, hasUserToken, setUserTokens, getChainId, isWalletConnected, addUserTokens } from "@scom/scom-token-input/scom-token-list/utils.ts";
    import { DefaultERC20Tokens, ChainNativeTokenByChainId } from "@scom/scom-token-input/scom-token-list/tokens/index.ts";
    import assets from "@scom/scom-token-input/scom-token-list/assets.ts";
    let tokenStore: TokenStore;
    const setTokenStore: () => TokenStore;
    export { hasMetaMask, hasUserToken, setUserTokens, addUserTokens, getChainId, isWalletConnected, DefaultERC20Tokens, ChainNativeTokenByChainId, tokenStore, setTokenStore, assets };
}
/// <amd-module name="@scom/scom-token-input/tokenSelect.css.ts" />
declare module "@scom/scom-token-input/tokenSelect.css.ts" {
    export const scrollbarStyle: string;
    export const tokenStyle: string;
    export const modalStyle: string;
    const _default_2: string;
    export default _default_2;
}
/// <amd-module name="@scom/scom-token-input/tokenSelect.tsx" />
declare module "@scom/scom-token-input/tokenSelect.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { ITokenObject } from "@scom/scom-token-input/global/index.ts";
    interface TokenSelectElement extends ControlElement {
        chainId?: number;
        token?: ITokenObject;
        tokenList?: ITokenObject[];
        onSelectToken?: (token: ITokenObject) => void;
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
        onSelectToken: (token: ITokenObject) => void;
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/interface.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/interface.ts" {
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
}
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/avalanche.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/avalanche.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/ethereum.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/ethereum.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/polygon.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/polygon.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/bsc.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/bsc.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/fantom.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/fantom.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/cronos.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/cronos.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/index.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/index.ts" {
    export { Tokens_Avalanche } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/avalanche.ts";
    export { Tokens_Ethereuem } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/ethereum.ts";
    export { Tokens_Polygon } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/polygon.ts";
    export { Tokens_BSC } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/bsc.ts";
    export { Tokens_Fantom } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/fantom.ts";
    export { Tokens_Cronos } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/mainnet/cronos.ts";
}
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/bsc-testnet.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/bsc-testnet.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/fuji.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/fuji.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/mumbai.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/mumbai.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/fantom-testnet.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/fantom-testnet.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/amino.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/amino.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/aminoX-testnet.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/aminoX-testnet.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/cronos-testnet.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/cronos-testnet.ts" {
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/index.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/index.ts" {
    export { Tokens_BSC_Testnet } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/bsc-testnet.ts";
    export { Tokens_Fuji } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/fuji.ts";
    export { Tokens_Mumbai } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/mumbai.ts";
    export { Tokens_Fantom_Testnet } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/fantom-testnet.ts";
    export { Tokens_Amino } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/amino.ts";
    export { Tokens_AminoXTestnet } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/aminoX-testnet.ts";
    export { Tokens_Cronos_Testnet } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/testnet/cronos-testnet.ts";
}
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/index.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/index.ts" {
    import { ITokenObject } from "@scom/scom-token-input/scom-token-modal/scom-token-list/interface.ts";
    const DefaultERC20Tokens: {
        [chainId: number]: ITokenObject[];
    };
    const ChainNativeTokenByChainId: {
        [chainId: number]: ITokenObject;
    };
    const WETHByChainId: {
        [chainId: number]: ITokenObject;
    };
    const getOpenSwapToken: (chainId: number) => ITokenObject;
    const DefaultTokens: {
        [chainId: number]: ITokenObject[];
    };
    const ToUSDPriceFeedAddressesMap: {
        [chainId: number]: {
            [token: string]: string;
        };
    };
    const tokenPriceAMMReference: {
        [chainId: number]: {
            [token: string]: string;
        };
    };
    export { DefaultERC20Tokens, ChainNativeTokenByChainId, WETHByChainId, DefaultTokens, ToUSDPriceFeedAddressesMap, tokenPriceAMMReference, getOpenSwapToken };
}
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/utils.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/utils.ts" {
    import { ITokenObject } from "@scom/scom-token-input/scom-token-modal/scom-token-list/interface.ts";
    export enum WalletPlugin {
        MetaMask = "metamask",
        WalletConnect = "walletconnect"
    }
    export const state: {
        userTokens: {
            [key: string]: ITokenObject[];
        };
    };
    export function isWalletConnected(): boolean;
    export function getChainId(): number;
    export const hasMetaMask: () => boolean;
    export const setUserTokens: (token: ITokenObject, chainId: number) => void;
    export const hasUserToken: (address: string, chainId: number) => boolean;
    export const getUserTokens: (chainId: number) => any[] | null;
    export const addUserTokens: (token: ITokenObject) => void;
    export const getChainNativeToken: (chainId: number) => ITokenObject;
}
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/token.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/token.ts" {
    import { ITokenObject, TokenMapType } from "@scom/scom-token-input/scom-token-modal/scom-token-list/interface.ts";
    export type DefaultTokensByChainType = Record<number, ITokenObject[]>;
    export type TokenBalancesType = Record<string, string>;
    export class TokenStore {
        private _defaultTokensByChain;
        private _tokenBalances;
        private _tokenMap;
        constructor(defaultTokensByChain: DefaultTokensByChainType);
        get tokenBalances(): TokenBalancesType;
        get tokenMap(): TokenMapType;
        getTokenList(chainId: number): ITokenObject[];
        private getERC20Balance;
        getTokenBalance(token: ITokenObject): string;
        private _updateAllTokenBalances;
        updateAllTokenBalances(): Promise<TokenBalancesType>;
        updateTokenBalances(erc20TokenList: ITokenObject[]): Promise<TokenBalancesType>;
        private _updateTokenMapData;
        updateTokenMapData(): TokenMapType;
    }
}
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/assets.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/assets.ts" {
    import { ITokenObject } from "@scom/scom-token-input/scom-token-modal/scom-token-list/interface.ts";
    function fullPath(path: string): string;
    function tokenPath(tokenObj?: ITokenObject, chainId?: number): string;
    const _default_3: {
        fullPath: typeof fullPath;
        tokenPath: typeof tokenPath;
        fallbackUrl: string;
    };
    export default _default_3;
}
/// <amd-module name="@scom/scom-token-input/scom-token-modal/scom-token-list/index.ts" />
declare module "@scom/scom-token-input/scom-token-modal/scom-token-list/index.ts" {
    import { TokenStore } from "@scom/scom-token-input/scom-token-modal/scom-token-list/token.ts";
    import { hasMetaMask, hasUserToken, setUserTokens, getChainId, isWalletConnected, addUserTokens } from "@scom/scom-token-input/scom-token-modal/scom-token-list/utils.ts";
    import { DefaultERC20Tokens, ChainNativeTokenByChainId } from "@scom/scom-token-input/scom-token-modal/scom-token-list/tokens/index.ts";
    import assets from "@scom/scom-token-input/scom-token-modal/scom-token-list/assets.ts";
    let tokenStore: TokenStore;
    const setTokenStore: () => TokenStore;
    export { hasMetaMask, hasUserToken, setUserTokens, addUserTokens, getChainId, isWalletConnected, DefaultERC20Tokens, ChainNativeTokenByChainId, tokenStore, setTokenStore, assets };
}
/// <amd-module name="@scom/scom-token-input/scom-token-modal/interface.ts" />
declare module "@scom/scom-token-input/scom-token-modal/interface.ts" {
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
}
/// <amd-module name="@scom/scom-token-input/scom-token-modal/utils.ts" />
declare module "@scom/scom-token-input/scom-token-modal/utils.ts" {
    export const formatNumber: (value: any, decimals?: number) => string;
    export const formatNumberWithSeparators: (value: number, precision?: number) => string;
    export const getNetworkInfo: (chainId: number) => any;
    export const viewOnExplorerByAddress: (chainId: number, address: string) => void;
}
/// <amd-module name="@scom/scom-token-input/scom-token-modal/importToken.tsx" />
declare module "@scom/scom-token-input/scom-token-modal/importToken.tsx" {
    import { Control, ControlElement, Module, Container } from '@ijstech/components';
    import { ITokenObject } from "@scom/scom-token-input/scom-token-modal/interface.ts";
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
/// <amd-module name="@scom/scom-token-input/scom-token-modal/index.css.ts" />
declare module "@scom/scom-token-input/scom-token-modal/index.css.ts" {
    export const tokenStyle: string;
    const _default_4: string;
    export default _default_4;
}
/// <amd-module name="@scom/scom-token-input/scom-token-modal/index.tsx" />
declare module "@scom/scom-token-input/scom-token-modal/index.tsx" {
    import { Module, Control, ControlElement, Container } from '@ijstech/components';
    import { ITokenObject } from "@scom/scom-token-input/scom-token-modal/interface.ts";
    interface ScomTokenModalElement extends ControlElement {
        title?: string;
        chainId?: number;
        token?: ITokenObject;
        importable?: boolean;
        isSortBalanceShown?: boolean;
        isCommonShown?: boolean;
        onSelectToken?: (token: ITokenObject) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-scom-token-modal']: ScomTokenModalElement;
            }
        }
    }
    export default class ScomTokenModal extends Module {
        private tokenBalancesMap;
        private hstackMap;
        private currentToken;
        private $eventBus;
        private _targetChainId;
        private _token;
        private _title;
        private _isCommonShown;
        private _isSortBalanceShown;
        private _importable;
        private mdTokenSelection;
        private gridTokenList;
        private gridCommonToken;
        private pnlCommonToken;
        private pnlSortBalance;
        private mdImportToken;
        private titleStack;
        private sortValue;
        private iconSortUp;
        private iconSortDown;
        private inputSearch;
        private filterValue;
        onSelectToken: (token: ITokenObject) => void;
        constructor(parent?: Container, options?: any);
        static create(options?: ScomTokenModalElement, parent?: Container): Promise<ScomTokenModal>;
        get token(): ITokenObject | undefined;
        set token(value: ITokenObject | undefined);
        get targetChainId(): number;
        set targetChainId(value: number);
        get chainId(): number;
        get isCommonShown(): boolean;
        set isCommonShown(value: boolean);
        get isSortBalanceShown(): boolean;
        set isSortBalanceShown(value: boolean);
        get importable(): boolean;
        set importable(value: boolean);
        get title(): any;
        set title(value: string | Control);
        onRefresh(): void;
        private updateDataByNewToken;
        private onUpdateData;
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
        showModal(): void;
        closeModal(): void;
        private setActive;
        private onSelect;
        init(): Promise<void>;
        showImportTokenModal(target: Control, event: Event, token: ITokenObject): void;
        onImportToken(target: Control, token: ITokenObject): void;
        onCloseModal(): void;
        onOpenModal(): void;
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
        private _onChanged;
        private _onSetMaxBalance;
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
        get onSetMaxBalance(): any;
        set onSetMaxBalance(callback: any);
        get isInputShown(): boolean;
        set isInputShown(value: boolean);
        get isBalanceShown(): boolean;
        set isBalanceShown(value: boolean);
        onSetMax(): Promise<void>;
        get onChanged(): any;
        set onChanged(callback: any);
        private onAmountChanged;
        private onToggleFocus;
        private onSelectToken;
        _handleFocus(event: Event): boolean;
        private renderTokenList;
        private updateStatusButton;
        private updateTokenButton;
        private onButtonClicked;
        init(): void;
        render(): any;
    }
}

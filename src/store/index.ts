import { DefaultTokens } from './tokens/index';
import { TokenStore } from './token';

export let tokenStore: TokenStore = new TokenStore(DefaultTokens);

export const setTokenStore = () => {
  tokenStore = new TokenStore(DefaultTokens);
}

export {
  DefaultERC20Tokens,
  ChainNativeTokenByChainId,
  DefaultTokens,
  CoreContractAddressesByChainId
} from './tokens/index'
export * from './utils'

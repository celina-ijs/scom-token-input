import { application, Styles } from '@ijstech/components';
import { ITokenObject } from './global/index';
const moduleDir = application.currentModuleDir;

function fullPath(path: string): string {
  return `${moduleDir}/${path}`
}
const TokenFolderName: { [key: number]: string } = {
  1: "ethereum",
  25: "cronos",
  42: "kovan",
  56: "bsc",
  97: "bsc-testnet",
  137: "polygon",
  338: "cronos-testnet",
  31337: "amino",
  80001: "mumbai",
  43113: "fuji",
  43114: "avalanche",
  250: "fantom",
  4002: "fantom-testnet",
  13370: "aminox-testnet"
}
function tokenPath(tokenObj?: ITokenObject, chainId?: number): string {
  const pathPrefix = 'img/tokens';
  if (tokenObj && chainId >= 0) {
      let folderName = TokenFolderName[chainId];
      let fileName = (!tokenObj.isNative ? tokenObj.address.toLowerCase() : tokenObj.symbol) + '.png';
      return fullPath(`${pathPrefix}/${folderName}/${fileName}`);
  } else {
      return fullPath(`${pathPrefix}/Custom.png`);
  }
}
export default {
  fonts: {
    poppins: {
      bold: fullPath('fonts/poppins/PoppinsBold.ttf'),
      italic: fullPath('fonts/poppins/PoppinsItalic.ttf'),
      light: fullPath('fonts/poppins/PoppinsLight.ttf'),
      medium: fullPath('fonts/poppins/PoppinsMedium.ttf'),
      regular: fullPath('fonts/poppins/PoppinsRegular.ttf'),
      thin: fullPath('fonts/poppins/PoppinsThin.ttf'),
    }
  },
  img: {
    network: {
      bsc: fullPath('img/network/bsc.svg'),
      eth: fullPath('img/network/eth.svg'),
      amio: fullPath('img/network/amio.svg'),
      avax: fullPath('img/network/avax.svg'),
      ftm: fullPath('img/network/ftm.svg'),
      polygon: fullPath('img/network/polygon.svg'),
    },
    wallet: {
      metamask: fullPath('img/wallet/metamask.png'),
      trustwallet: fullPath('img/wallet/trustwallet.svg'),
      binanceChainWallet: fullPath('img/wallet/binance-chain-wallet.svg'),
      walletconnect: fullPath('img/wallet/walletconnect.svg')
    }
  },
  fullPath,
  tokenPath
};

import { Wallet } from '@ijstech/eth-wallet';


export function getChainId() {
  return Wallet.getInstance().chainId;
}

export const getNetworkInfo = (chainId: number): any => {
  return Wallet.getClientInstance().getNetworkInfo(chainId) as any
}

export const viewOnExplorerByAddress = (chainId: number, address: string) => {
  let network = getNetworkInfo(chainId);
  if (network && network.blockExplorerUrls[0]) {
    const url = `${network.blockExplorerUrls[0]}${address}`;
    window.open(url);
  }
}

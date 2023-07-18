import { Wallet } from '@ijstech/eth-wallet';

const state = {
  rpcWalletId: "",
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

export const updateStore = (data: any) => {
  if (data.rpcWalletId) {
    state.rpcWalletId = data.rpcWalletId;
  }
}

export const getRpcWallet = () => {
  return Wallet.getRpcWalletInstance(state.rpcWalletId);
}

export function getChainId() {
  const rpcWallet = getRpcWallet();
  return rpcWallet?.chainId;
};


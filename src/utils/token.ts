import { BigNumber, Erc20, Wallet, IWallet } from "@ijstech/eth-wallet";
import { ITokenObject } from "../global/index";

export const getERC20Amount = async (wallet: IWallet, tokenAddress: string, decimals: number) => {
  try {
    let erc20 = new Erc20(wallet, tokenAddress, decimals);
    return await erc20.balance;
  } catch {
    return new BigNumber(0);
  }
}

export const getTokenBalance = async (token: ITokenObject) => {
  const wallet = Wallet.getInstance();
  let balance = new BigNumber(0);
  if (!token) return balance;
  if (token.address) {
    balance = await getERC20Amount(wallet, token.address, token.decimals);
  } else {
    balance = await wallet.balance;
  }
  return balance;
}

import { FormatUtils } from "@ijstech/components";
import { BigNumber, Wallet } from "@ijstech/eth-wallet";
import { ITokenObject } from "@scom/scom-token-list";

export const formatNumber = (value: number | string | BigNumber, decimals?: number) => {
  const minValue = '0.0000001';
  const newValue = typeof value === 'object' ? value.toString() : value;
  return FormatUtils.formatNumber(newValue, { decimalFigures: decimals || 4, minValue });
}

export const getTokenInfo =  async (address: string, chainId: number) => {
  let token: ITokenObject;
  const wallet = Wallet.getClientInstance();
  await wallet.init();
  wallet.chainId = chainId;
  const isValidAddress = wallet.isAddress(address);
  if (isValidAddress) {
    const tokenAddress = wallet.toChecksumAddress(address);
    const tokenInfo = await wallet.tokenInfo(tokenAddress);
    if (tokenInfo?.symbol) {
      token = {
        chainId,
        address: tokenAddress,
        name: tokenInfo.name,
        decimals: tokenInfo.decimals,
        symbol: tokenInfo.symbol
      }
    }
  }
  return token;
}
import { FormatUtils } from "@ijstech/components";
import { BigNumber } from "@ijstech/eth-wallet";

export const formatNumber = (value: number | string | BigNumber, decimals?: number) => {
  const minValue = '0.0000001';
  const newValue = typeof value === 'object' ? value.toString() : value;
  return FormatUtils.formatNumber(newValue, { decimalFigures: decimals || 4, minValue });
};
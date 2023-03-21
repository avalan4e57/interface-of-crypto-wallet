import BigNumber from "bignumber.js";

export function transformFloatingPointToReadableFormat(number: string) {
  return new BigNumber(number).toFixed(5, BigNumber.ROUND_DOWN);
}

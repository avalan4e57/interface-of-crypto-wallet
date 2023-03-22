import BigNumber from "bignumber.js";

export function toBasicUnit(value: string, decimals: string) {
  const basicUnit = new BigNumber(10).pow(new BigNumber(decimals));
  const tokenUnits = basicUnit.toNumber() * parseFloat(value);
  return tokenUnits.toString();
}

export function toMainUnit(value: string, decimals: string) {
  const basicUnit = new BigNumber(10).pow(new BigNumber(decimals));
  const tokenUnits = new BigNumber(value).div(basicUnit);
  return tokenUnits.toFixed();
}

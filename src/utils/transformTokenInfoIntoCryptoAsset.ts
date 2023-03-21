import { TokenInfo, CryptoAsset } from "@/types";
import BigNumber from "bignumber.js";

function transformTokenInfoToCryptoAsset(
  { balance, decimals, symbol }: TokenInfo,
  address: string
): CryptoAsset {
  return {
    balance,
    symbol,
    address,
    toBasicUnit: (value: string) => {
      const basicUnit = new BigNumber(10).pow(new BigNumber(decimals));
      const tokenUnits = basicUnit.toNumber() * parseFloat(value);
      return tokenUnits.toString();
    },
    toMainUnit: (value: string) => {
      const basicUnit = new BigNumber(10).pow(new BigNumber(decimals));
      const tokenUnits = new BigNumber(value).div(basicUnit);
      return tokenUnits.toFixed();
    },
  };
}

export default transformTokenInfoToCryptoAsset;

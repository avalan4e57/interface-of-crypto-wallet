import { TokenInfo, CryptoAsset } from "@/types";
import getBalanceInReadableFormat from "./getBalanceInReadableFormat";

function transformTokenInfoToCryptoAsset(
  { balance, decimals, symbol }: TokenInfo,
  address: string
): CryptoAsset {
  return {
    balance: getBalanceInReadableFormat(balance, decimals),
    symbol,
    address,
  };
}

export default transformTokenInfoToCryptoAsset;

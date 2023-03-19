import { CryptoAsset } from "@/types";
import { FC } from "react";

type CryptoAssetCardProps = {
  cryptoAsset: CryptoAsset;
};

export const CryptoAssetCard: FC<CryptoAssetCardProps> = ({ cryptoAsset }) => {
  return (
    <div>
      <p>{cryptoAsset.symbol}</p>
      <p>{cryptoAsset.balance}</p>
    </div>
  );
};

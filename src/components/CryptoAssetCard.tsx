import { CryptoAsset } from "@/types";
import { transformFloatingPointToReadableFormat } from "@/utils/transformFloatingPointToReadableFormat";
import { FC } from "react";

type CryptoAssetCardProps = {
  cryptoAsset: CryptoAsset;
};

export const CryptoAssetCard: FC<CryptoAssetCardProps> = ({ cryptoAsset }) => {
  return (
    <div>
      <p>{cryptoAsset.symbol}</p>
      <p>
        {transformFloatingPointToReadableFormat(
          cryptoAsset.toMainUnit(cryptoAsset.balance)
        )}
      </p>
    </div>
  );
};

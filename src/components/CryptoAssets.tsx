import { FC } from "react";
import { CryptoAssetCard } from "./CryptoAssetCard";
import { CryptoAsset } from "@/types";

type CryptoAssetsProps = {
  cryptoAssets: CryptoAsset[];
};

const CryptoAssets: FC<CryptoAssetsProps> = ({ cryptoAssets }) => {
  return (
    <div>
      {cryptoAssets.map((cryptoAsset: CryptoAsset) => (
        <CryptoAssetCard key={cryptoAsset.address} cryptoAsset={cryptoAsset} />
      ))}
    </div>
  );
};

export default CryptoAssets;

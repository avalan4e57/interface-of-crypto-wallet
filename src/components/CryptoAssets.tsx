import { FC } from "react";

import { CryptoAssetCard } from "./CryptoAssetCard";
import { CryptoAsset } from "@/types";
import { useCryptoAssets } from "@/hooks/useCryptoAssets";

const CryptoAssets: FC = () => {
  const { assets: cryptoAssets } = useCryptoAssets();

  return (
    <div>
      {cryptoAssets.map((cryptoAsset: CryptoAsset) => (
        <CryptoAssetCard key={cryptoAsset.address} cryptoAsset={cryptoAsset} />
      ))}
    </div>
  );
};

export default CryptoAssets;

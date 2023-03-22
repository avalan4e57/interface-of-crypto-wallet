import { FC } from "react";
import { CryptoAsset, CryptoAssetView } from "@/types";
import { transformFloatingPointToReadableFormat } from "@/utils/transformFloatingPointToReadableFormat";
import CryptoAssetsTable from "./CryptoAssets.Table";

type CryptoAssetsProps = {
  cryptoAssets: CryptoAsset[];
  loading: boolean;
};

const CryptoAssets: FC<CryptoAssetsProps> = ({ cryptoAssets, loading }) => {
  const trasformCryptoAssetToView = (
    cryptoAsset: CryptoAsset
  ): CryptoAssetView => {
    const balance = transformFloatingPointToReadableFormat(
      cryptoAsset.toMainUnit(cryptoAsset.balance)
    );
    return {
      address: cryptoAsset.address,
      symbol: cryptoAsset.symbol,
      balance,
    };
  };

  /**
   * Transform CryptoAsset to CryptoAssetView
   * @param cryptoAssets Array of CryptoAsset
   * @returns Array of CryptoAssetView
   */
  const transformData = (cryptoAssets: CryptoAsset[]) =>
    cryptoAssets.map(trasformCryptoAssetToView);

  return (
    <CryptoAssetsTable
      cryptoAssets={transformData(cryptoAssets)}
      loading={loading}
    />
  );
};

export default CryptoAssets;

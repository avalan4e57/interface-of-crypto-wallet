import { CryptoAsset } from "@/types";
import { useState, useEffect, useCallback } from "react";
import useERC20Token from "./useERC20Token";

function useRefetchBalances(
  assets: CryptoAsset[],
  updateAssets: (assets: CryptoAsset[]) => void
) {
  const [isRefetchingBalancesStarted, setIsRefetchingBalancesStarted] =
    useState<boolean>(false);
  const { getTokenBalance } = useERC20Token();

  const startRefetchingBalances = useCallback(
    () => setIsRefetchingBalancesStarted(true),
    []
  );

  useEffect(() => {
    let ignore = false;

    async function refetchBalances() {
      const tokenAssetsPromises = assets.map(async (asset) => {
        const balance = await getTokenBalance(asset);
        return { ...asset, balance };
      });
      try {
        const updatedAssets = await Promise.all(tokenAssetsPromises);
        if (!ignore) {
          updateAssets(updatedAssets);
        }
      } catch (error) {
        console.log("Failed to refetch balances", error);
      } finally {
        setIsRefetchingBalancesStarted(false);
      }
    }

    if (isRefetchingBalancesStarted) {
      refetchBalances();
      console.log("Refetching balances...");
    }

    return () => {
      ignore = true;
    };
  }, [assets, getTokenBalance, isRefetchingBalancesStarted, updateAssets]);

  return { startRefetchingBalances };
}

export default useRefetchBalances;

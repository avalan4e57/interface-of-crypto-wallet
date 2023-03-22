import { CryptoAsset } from "@/types";
import { useState, useEffect, useCallback } from "react";
import useERC20TokenUtils from "./useERC20TokenUtils";
import { useNativeERC20TokenUtils } from "./useNativeERC20TokenUtils";

function useRefetchBalances(
  assets: CryptoAsset[],
  updateAssets: (assets: CryptoAsset[]) => void
) {
  const [isRefetchingBalancesStarted, setIsRefetchingBalancesStarted] =
    useState<boolean>(false);
  const { getTokenBalance } = useERC20TokenUtils();
  const { getNativeTokenBalance } = useNativeERC20TokenUtils();

  const startRefetchingBalances = useCallback(
    () => setIsRefetchingBalancesStarted(true),
    []
  );

  useEffect(() => {
    let ignore = false;

    async function refetchBalances() {
      const [nativeTokenAsset, ...tokenAssets] = assets;
      const nativeTokenPromise = getNativeTokenBalance().then((balance) => {
        return { ...nativeTokenAsset, balance };
      });
      const tokenAssetsPromises = tokenAssets.map(async (asset) => {
        const balance = await getTokenBalance(asset.address);
        return { ...asset, balance };
      });
      try {
        const updatedAssets = await Promise.all([
          nativeTokenPromise,
          ...tokenAssetsPromises,
        ]);
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
  }, [
    assets,
    getNativeTokenBalance,
    getTokenBalance,
    isRefetchingBalancesStarted,
    updateAssets,
  ]);

  return { startRefetchingBalances };
}

export default useRefetchBalances;

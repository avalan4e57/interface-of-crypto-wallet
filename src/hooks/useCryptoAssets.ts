import { useCallback, useEffect, useState } from "react";
import { CryptoAsset } from "@/types";
import { useWallet } from "@/contexts/WalletContext";
import defaultTokenAddresses from "@/constants/defaultTokenContracts";
import InvalidContractAddressError from "@/errors/InvalidContractAddressError";
import useRefetchBalances from "./useRefetchBalances";
import useERC20Token from "./useERC20Token";

export function useCryptoAssets() {
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);

  const { account, networkId } = useWallet();
  const { getERC20TokenInfo } = useERC20Token();
  const updateAssets = useCallback((assets: CryptoAsset[]) => {
    setAssets(assets);
  }, []);
  const { startRefetchingBalances } = useRefetchBalances(assets, updateAssets);

  useEffect(() => {
    let ignore = false;

    async function getTokenAssets() {
      if (!account) throw new Error("No account provided");
      if (!networkId) throw new Error("No networkId provided");
      const tokenAddresses = [account, ...defaultTokenAddresses];
      const tokenInfoPromises = await tokenAddresses.reduce<
        Promise<CryptoAsset[]>
      >(async (accumulator, address) => {
        const currentAccumulator = await accumulator;
        try {
          const tokenInfo = await getERC20TokenInfo(account, address);
          currentAccumulator.push(tokenInfo);
        } catch (error) {
          if (error instanceof InvalidContractAddressError) {
            console.warn("Invalid contract address", error.contractAddress);
          } else {
            console.log("error", error);
          }
        } finally {
          return currentAccumulator;
        }
      }, Promise.resolve([]));

      try {
        return await Promise.all(tokenInfoPromises);
      } catch (error) {
        throw error;
      }
    }

    async function fetchAssets() {
      try {
        setLoading(true);
        const tokenAssets = await getTokenAssets();
        if (!ignore) setAssets(tokenAssets);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    if (account) {
      fetchAssets();
      console.log("fetchingAssets...", account);
    }
    return () => {
      ignore = true;
    };
  }, [account, getERC20TokenInfo, networkId]);

  useEffect(() => {
    console.log("assets", assets);
  }, [assets]);

  return { assets, error, refetchBalances: startRefetchingBalances, loading };
}

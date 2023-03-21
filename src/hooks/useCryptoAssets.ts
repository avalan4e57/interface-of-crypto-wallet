import useERC20TokenUtils from "@/hooks/useERC20TokenUtils";
import { useCallback, useEffect, useState } from "react";
import { CryptoAsset } from "@/types";
import { useWallet } from "@/contexts/WalletContext";
import defaultTokenContracts from "@/constants/defaultTokenContracts";
import { useNativeERC20TokenUtils } from "@/hooks/useNativeERC20TokenUtils";
import InvalidContractAddressError from "@/errors/InvalidContractAddressError";
import transformTokenInfoToCryptoAsset from "@/utils/transformTokenInfoIntoCryptoAsset";

export function useCryptoAssets() {
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [error, setError] = useState<unknown>();

  const { account } = useWallet();
  const { getTokenInfo, getTokenBalance } = useERC20TokenUtils();
  const { getNativeTokenInfo } = useNativeERC20TokenUtils();

  const refetchToken = useCallback(
    (tokenAddress: string) => {
      const tokenAsset = assets.find((asset) => asset.address === tokenAddress);
      if (tokenAsset) {
        getTokenBalance(tokenAddress).then((balance) => {
          setAssets(
            assets.map((asset) =>
              asset.address === tokenAddress
                ? {
                    ...asset,
                    balance,
                  }
                : asset
            )
          );
        });
      }
    },
    [assets, getTokenBalance]
  );

  useEffect(() => {
    let ignore = false;

    async function getNativeTokenAsset() {
      if (!account) throw new Error("No account provided");

      const nativeTokenInfo = await getNativeTokenInfo();
      const nativeTokenAsset = transformTokenInfoToCryptoAsset(
        nativeTokenInfo,
        account
      );
      return nativeTokenAsset;
    }

    async function getOtherTokenAssets() {
      const tokensInfoPromises = await defaultTokenContracts.reduce<
        Promise<CryptoAsset[]>
      >(async (accumulator, address) => {
        if (!account) throw new Error("No account provided");

        const current = await accumulator;
        try {
          const tokenInfo = await getTokenInfo(address);
          current.push(transformTokenInfoToCryptoAsset(tokenInfo, address));
        } catch (error) {
          if (error instanceof InvalidContractAddressError) {
            console.warn("Invalid contract address", error.contractAddress);
          } else {
            console.log("error", error);
          }
        } finally {
          return current;
        }
      }, Promise.resolve([]));

      try {
        return await Promise.all(tokensInfoPromises);
      } catch (error) {
        throw error;
      }
    }
    async function fetchAssets() {
      try {
        const nativeTokenAsset = await getNativeTokenAsset();
        const tokenAssets = await getOtherTokenAssets();
        if (!ignore) setAssets([nativeTokenAsset, ...tokenAssets]);
      } catch (error) {
        setError(error);
      }
    }

    if (account) {
      fetchAssets();
      console.log("fetchingAssets...", account);
    }
    return () => {
      ignore = true;
    };
  }, [account, getNativeTokenInfo, getTokenInfo]);

  useEffect(() => {
    console.log("assets", assets);
  }, [assets]);

  return { assets, error, refetchToken };
}

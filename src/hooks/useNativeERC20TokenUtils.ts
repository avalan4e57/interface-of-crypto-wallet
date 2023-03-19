import { supportedChainSymbols } from "@/constants/supportedChainsMappings";
import { useWallet } from "@/contexts/WalletContext";
import { useWeb3 } from "@/contexts/Web3Context";
import { SupportedChains } from "@/enums";
import { TokenInfo } from "@/types";
import { useCallback } from "react";

/**
 * @description Hook to interact with native ERC20 tokens
 * @returns {Object} Object containing functions to interact with native ERC20 tokens
 * @property {Function} getNativeTokenBalance Gets the native token balance of the connected wallet
 * @property {Function} getNativeTokenDecimals Gets the native token decimals
 * @property {Function} getNativeTokenSymbol Gets the native token symbol
 * @property {Function} getNativeTokenInfo Gets the native token info combined from the above functions
 */
export function useNativeERC20TokenUtils() {
  const { web3 } = useWeb3();
  const { account, networkId } = useWallet();

  const getNativeTokenBalance = useCallback(async () => {
    if (!web3) {
      throw new Error(`No web3 instance provided`);
    }
    if (!account) {
      throw new Error(`No account provided`);
    }
    if (!networkId) {
      throw new Error(`No networkId provided`);
    }
    try {
      const balance = await web3.eth.getBalance(account);
      return balance;
    } catch (err) {
      throw new Error(`Error getting native token balance: ${err}`);
    }
  }, [account, networkId, web3]);

  const getNativeTokenDecimals = useCallback(() => "18", []);

  const getNativeTokenSymbol = useCallback(async () => {
    if (!web3) {
      throw new Error(`No web3 instance provided`);
    }
    try {
      const currentChainId = await web3.eth.getChainId();

      if (currentChainId === SupportedChains.Ethereum) {
        return supportedChainSymbols[SupportedChains.Ethereum];
      }
      if (currentChainId === SupportedChains.Goerli) {
        return supportedChainSymbols[SupportedChains.Goerli];
      }
      if (currentChainId === SupportedChains.tBSC) {
        return supportedChainSymbols[SupportedChains.tBSC];
      }
      return supportedChainSymbols[SupportedChains.NOT_SUPPORTED];
    } catch (err) {
      throw new Error(`Error getting native token symbol: ${err}`);
    }
  }, [web3]);

  const getNativeTokenInfo = useCallback(async (): Promise<TokenInfo> => {
    try {
      const [balance, decimals, symbol] = await Promise.all([
        getNativeTokenBalance(),
        getNativeTokenDecimals(),
        getNativeTokenSymbol(),
      ]);
      return { balance, decimals, symbol };
    } catch (err) {
      throw new Error(`Error getting native token info: ${err}`);
    }
  }, [getNativeTokenBalance, getNativeTokenDecimals, getNativeTokenSymbol]);
  return {
    getNativeTokenBalance,
    getNativeTokenDecimals,
    getNativeTokenSymbol,
    getNativeTokenInfo,
  };
}

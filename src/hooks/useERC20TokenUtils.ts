import balanceOfABI from "@/abi/balanceOfABI";
import decimalsABI from "@/abi/decimalsABI";
import symbolABI from "@/abi/symbolABI";
import totalSupplyABI from "@/abi/totalSupplyABI";
import { useWallet } from "@/contexts/WalletContext";
import { useWeb3 } from "@/contexts/Web3Context";
import InvalidContractAddressError from "@/errors/InvalidContractAddressError";
import { TokenInfo } from "@/types";
import { useCallback } from "react";
import { Contract } from "web3-eth-contract";

const abi: any[] = [
  ...balanceOfABI,
  ...decimalsABI,
  ...symbolABI,
  ...totalSupplyABI,
];

/**
 * @description Hook to interact with ERC20 tokens
 * @returns {Object} Object containing functions to interact with ERC20 tokens
 * @property {Function} createContractInstance Creates a contract instance
 * @property {Function} getTokenBalance Gets the token balance of the connected wallet
 * @property {Function} getTokenDecimals Gets the token decimals
 * @property {Function} getTokenSymbol Gets the token symbol
 * @property {Function} getTokenInfo Gets the token info combined from the above functions
 */
export function useERC20TokenUtils() {
  const { web3 } = useWeb3();
  const { account, networkId } = useWallet();

  const createContractInstance = useCallback(
    async (contractAddress: string) => {
      if (!web3) {
        throw new Error(`No web3 instance provided`);
      }
      if (!account) {
        throw new Error(`No account provided`);
      }
      if (!networkId) {
        throw new Error(`No networkId provided`);
      }
      const contractInstance = new web3.eth.Contract(abi, contractAddress);
      try {
        await contractInstance.methods.totalSupply().call();
        return contractInstance;
      } catch (err) {
        throw new InvalidContractAddressError("", contractAddress);
      }
    },
    [account, networkId, web3]
  );

  const getTokenBalance = useCallback(
    async (contractAddress: string, contract?: Contract) => {
      if (!account) {
        throw new Error(`No account provided`);
      }
      try {
        const contractInstance =
          contract ?? (await createContractInstance(contractAddress));
        const balance = await contractInstance.methods
          .balanceOf(account)
          .call();
        return balance;
      } catch (err) {
        throw new Error(`Error getting token balance: ${err}`);
      }
    },
    [account, createContractInstance]
  );

  const getTokenDecimals = useCallback(
    async (contractAddress: string, contract?: Contract) => {
      try {
        const contractInstance =
          contract ?? (await createContractInstance(contractAddress));
        const decimals = await contractInstance.methods.decimals().call();
        return decimals;
      } catch (err) {
        throw new Error(`Error getting token decimals: ${err}`);
      }
    },
    [createContractInstance]
  );

  const getTokenSymbol = useCallback(
    async (contractAddress: string, contract?: Contract) => {
      try {
        const contractInstance =
          contract ?? (await createContractInstance(contractAddress));
        const symbol = await contractInstance.methods.symbol().call();
        return symbol;
      } catch (err) {
        throw new Error(`Error getting token symbol: ${err}`);
      }
    },
    [createContractInstance]
  );

  const getTokenInfo = useCallback(
    async (contractAddress: string): Promise<TokenInfo> => {
      let contractInstance: Contract;
      try {
        contractInstance = await createContractInstance(contractAddress);
      } catch (err) {
        throw err;
      }
      try {
        const [balance, decimals, symbol] = await Promise.all([
          getTokenBalance(contractAddress, contractInstance),
          getTokenDecimals(contractAddress, contractInstance),
          getTokenSymbol(contractAddress, contractInstance),
        ]);
        return { balance, decimals, symbol };
      } catch (err) {
        throw new Error(`Error getting token info: ${err}`);
      }
    },
    [createContractInstance, getTokenBalance, getTokenDecimals, getTokenSymbol]
  );

  return {
    getTokenBalance,
    getTokenDecimals,
    getTokenSymbol,
    getTokenInfo,
  };
}

export default useERC20TokenUtils;

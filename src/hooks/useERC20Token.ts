import balanceOfABI from "@/abi/balanceOfABI";
import decimalsABI from "@/abi/decimalsABI";
import symbolABI from "@/abi/symbolABI";
import totalSupplyABI from "@/abi/totalSupplyABI";
import transferABI from "@/abi/transferABI";
import { supportedChainSymbols } from "@/constants/supportedChainsMappings";
import { useWeb3 } from "@/contexts/Web3Context";
import { SupportedChains } from "@/enums";
import InvalidContractAddressError from "@/errors/InvalidContractAddressError";
import { CryptoAssetMetadata, TransferTokensPayload } from "@/types";
import { toBasicUnit, toMainUnit } from "@/utils/transformTokenValue";
import { useCallback } from "react";

const AbiERC20: any[] = [
  ...balanceOfABI,
  ...decimalsABI,
  ...symbolABI,
  ...totalSupplyABI,
  ...transferABI,
];

function useERC20Token() {
  const { web3 } = useWeb3();

  const getToken = useCallback(
    (account: string, address: string, abi = AbiERC20) => {
      if (!web3) throw new Error("No web3 instance provided");
      const isNativeToken = account === address;
      const contract = !isNativeToken
        ? new web3.eth.Contract(abi, address)
        : undefined;
      return { contract, address, account, isNativeToken };
    },
    [web3]
  );

  const isValidContract = useCallback(
    async (token: CryptoAssetMetadata) => {
      if (!web3) throw new Error("No web3 instance provided");

      if (token.isNativeToken) return true;

      if (!token.contract) throw new Error("No contract provided");

      try {
        await token.contract.methods.totalSupply().call();
        return true;
      } catch (error) {
        return false;
      }
    },
    [web3]
  );

  const getTokenBalance = useCallback(
    async (token: CryptoAssetMetadata) => {
      if (!web3) throw new Error("No web3 instance provided");
      try {
        if (token.isNativeToken) {
          return await web3.eth.getBalance(token.account);
        } else if (!token.contract) {
          throw new Error("No contract provided");
        } else {
          return await token.contract.methods.balanceOf(token.account).call();
        }
      } catch (error) {
        console.error(error);
        throw new Error(`Error getting token balance: ${error}`);
      }
    },
    [web3]
  );

  const getTokenDecimals = useCallback(
    async (token: CryptoAssetMetadata) => {
      if (!web3) throw new Error("No web3 instance provided");
      try {
        if (token.isNativeToken) {
          return "18";
        } else if (!token.contract) {
          throw new Error("No contract provided");
        } else {
          return await token.contract.methods.decimals().call();
        }
      } catch (error) {
        console.error(error);
        throw new Error(`Error getting token decimals: ${error}`);
      }
    },
    [web3]
  );

  const getTokenSymbol = useCallback(
    async (token: CryptoAssetMetadata) => {
      if (!web3) throw new Error("No web3 instance provided");
      try {
        if (token.isNativeToken) {
          const currentChainId = await web3.eth.getChainId();
          return supportedChainSymbols[currentChainId as SupportedChains];
        } else if (!token.contract) {
          throw new Error("No contract provided");
        } else {
          return await token.contract.methods.symbol().call();
        }
      } catch (error) {
        console.error(error);
        throw new Error(`Error getting token symbol: ${error}`);
      }
    },
    [web3]
  );

  const transferTokens = useCallback(
    async (token: CryptoAssetMetadata, to: string, value: string) => {
      if (!web3) throw new Error("No web3 instance provided");
      try {
        if (token.isNativeToken) {
          return await web3.eth.sendTransaction({
            from: token.account,
            to,
            value,
          });
        } else if (!token.contract) {
          throw new Error("No contract provided");
        } else {
          return await token.contract.methods

            .transfer(to, value)
            .send({ from: token.account });
        }
      } catch (error) {
        console.error(error);
        throw new Error(`Error sending token: ${error}`);
      }
    },
    [web3]
  );

  const getERC20TokenInfo = useCallback(
    async (account: string, address: string, abi?: any[]) => {
      const token = getToken(account, address, abi);
      try {
        const isValid = await isValidContract(token);
        if (!isValid) throw new InvalidContractAddressError("", address);
        const [balance, decimals, symbol] = await Promise.all([
          getTokenBalance(token),
          getTokenDecimals(token),
          getTokenSymbol(token),
        ]);

        return {
          balance,
          symbol,
          toMainUnit: (value: string) => toMainUnit(value, decimals),
          toBasicUnit: (value: string) => toBasicUnit(value, decimals),
          transferTokens: ({ to, value }: TransferTokensPayload) =>
            transferTokens(token, to, toBasicUnit(value, decimals)),
          ...token,
        };
      } catch (error) {
        if (error instanceof InvalidContractAddressError) throw error;
        throw new Error(`Error getting token info: ${error}`);
      }
    },
    [
      getToken,
      isValidContract,
      getTokenBalance,
      getTokenDecimals,
      getTokenSymbol,
      transferTokens,
    ]
  );

  return {
    getERC20TokenInfo,
    getTokenBalance,
  };
}

export default useERC20Token;

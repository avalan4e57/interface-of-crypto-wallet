import { SupportedChains } from "@/enums";

export const supportedChainNames: { [key in SupportedChains]: string } = {
  [SupportedChains.Ethereum]: "Ethereum Mainnet",
  [SupportedChains.Goerli]: "Goerli",
  [SupportedChains.tBSC]: "Binance Smart Chain (Testnet)",
  [SupportedChains.NOT_SUPPORTED]: "Not Supported",
};

export const supportedChainSymbols: { [key in SupportedChains]: string } = {
  [SupportedChains.Ethereum]: "ETH",
  [SupportedChains.Goerli]: "gETH",
  [SupportedChains.tBSC]: "tBNB",
  [SupportedChains.NOT_SUPPORTED]: "",
};

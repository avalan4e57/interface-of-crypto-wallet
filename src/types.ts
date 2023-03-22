import { Contract } from "web3-eth-contract";

export type TransferTokensPayload = {
  to: string;
  value: string;
};

export type CryptoAssetMetadata = {
  contract: Contract | undefined;
  address: string;
  account: string;
  isNativeToken: boolean;
};

export type CryptoAsset = CryptoAssetMetadata & {
  symbol: string;
  balance: string;
  toBasicUnit: (value: string) => string;
  toMainUnit: (value: string) => string;
  transferTokens: ({ to, value }: TransferTokensPayload) => Promise<any>;
};

export type CryptoAssetView = {
  symbol: string;
  balance: string;
  address: string;
};

export type TokenInfo = {
  symbol: string;
  decimals: string;
  balance: string;
};

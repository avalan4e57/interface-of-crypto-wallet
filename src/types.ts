export type CryptoAsset = {
  symbol: string;
  balance: string;
  address: string;
  toBasicUnit: (value: string) => string;
  toMainUnit: (value: string) => string;
};

export type TokenInfo = {
  symbol: string;
  decimals: string;
  balance: string;
};

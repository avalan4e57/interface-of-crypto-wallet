import { FC } from "react";
import CryptoAssets from "./CryptoAssets";
import TokenTransfer from "./TokenTransfer";
import { useCryptoAssets } from "@/hooks/useCryptoAssets";

const Wallet: FC = () => {
  const { assets, refetchToken } = useCryptoAssets();

  return (
    <>
      <p>Wallet is connected</p>
      <CryptoAssets cryptoAssets={assets} />
      <TokenTransfer assets={assets} refetchToken={refetchToken} />
    </>
  );
};
export default Wallet;

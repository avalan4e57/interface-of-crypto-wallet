import { FC } from "react";
import CryptoAssets from "./CryptoAssets";
import TokenTransfer from "./TokenTransfer";
import { useCryptoAssets } from "@/hooks/useCryptoAssets";
import { useWallet } from "@/contexts/WalletContext";
import { isChainSupported } from "@/utils/isChainSupported";

const Wallet: FC = () => {
  const { assets, refetchToken } = useCryptoAssets();
  const { networkId } = useWallet();

  if (networkId && !isChainSupported(networkId)) {
    return (
      <div>
        <p>Unsupported network</p>
      </div>
    );
  }

  return (
    <>
      <CryptoAssets cryptoAssets={assets} />
      <TokenTransfer assets={assets} refetchToken={refetchToken} />
    </>
  );
};
export default Wallet;

import { FC } from "react";
import ConnectMetamaskWalletButton from "./ConnectMetamaskWalletButton";
import { useWeb3 } from "@/contexts/Web3Context";
import { useWallet } from "@/contexts/WalletContext";
import { isChainSupported } from "@/utils/isChainSupported";
import Wallet from "./Wallet";

const Main: FC = () => {
  const { web3, setCurrentProvider } = useWeb3();
  const isWalletConnected = !!web3;
  const { networkId } = useWallet();

  if (networkId && !isChainSupported(networkId)) {
    return (
      <div>
        <p>Unsupported network</p>
      </div>
    );
  }

  if (isWalletConnected) {
    return <Wallet />;
  }
  return <ConnectMetamaskWalletButton onConnectWallet={setCurrentProvider} />;
};

export default Main;

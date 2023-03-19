import { FC } from "react";
import ConnectMetamaskWalletButton from "./ConnectMetamaskWalletButton";
import { useWeb3 } from "@/contexts/Web3Context";

const Main: FC = () => {
  const { web3, setCurrentProvider } = useWeb3();
  const isWalletConnected = !!web3;

  if (isWalletConnected) {
    return (
      <div>
        <p>Wallet is connected</p>
        <p></p>
      </div>
    );
  }
  return <ConnectMetamaskWalletButton onConnectWallet={setCurrentProvider} />;
};

export default Main;

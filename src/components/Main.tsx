import { FC } from "react";
import ConnectMetamaskWalletButton from "./ConnectMetamaskWalletButton";
import { useWeb3 } from "@/contexts/Web3Context";
import Wallet from "./Wallet";
import CryptoNews from "./CryptoNews";

const Main: FC = () => {
  const { web3, setCurrentProvider } = useWeb3();
  const isWalletConnected = !!web3;

  return (
    <>
      {isWalletConnected ? (
        <Wallet />
      ) : (
        <ConnectMetamaskWalletButton onConnectWallet={setCurrentProvider} />
      )}
      <CryptoNews />
    </>
  );
};

export default Main;

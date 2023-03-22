import { FC } from "react";
import ConnectMetamaskWalletButton from "./ConnectMetamaskWalletButton";
import { useWeb3 } from "@/contexts/Web3Context";
import Wallet from "./Wallet";
import CryptoNews from "./CryptoNews";
import { Container } from "@mui/material";

const Main: FC = () => {
  const { web3, setCurrentProvider } = useWeb3();
  const isWalletConnected = !!web3;

  return (
    <>
      <Container
        sx={{
          margin: "20px auto",
          ":after": {
            content: '""',
            display: "block",
            width: "100%",
            height: "1px",
            backgroundColor: "#e0e0e0",
            margin: "20px 0",
          },
        }}
      >
        {isWalletConnected ? (
          <Wallet />
        ) : (
          <ConnectMetamaskWalletButton onConnectWallet={setCurrentProvider} />
        )}
      </Container>
      <CryptoNews />
    </>
  );
};

export default Main;

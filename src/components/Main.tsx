import { FC } from "react";
import ConnectMetamaskWalletButton from "./ConnectMetamaskWalletButton";
import { useWeb3 } from "@/contexts/Web3Context";
import Wallet from "./Wallet";
import CryptoNews from "./CryptoNews";
import { Container, styled } from "@mui/material";

const StyledContainer = styled(Container)`
  margin: 20px auto;
  :after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #e0e0e0;
    margin: 20px 0;
  }
`;

const Main: FC = () => {
  const { web3, setCurrentProvider } = useWeb3();
  const isWalletConnected = !!web3;

  return (
    <>
      <StyledContainer>
        {isWalletConnected ? (
          <Wallet />
        ) : (
          <ConnectMetamaskWalletButton onConnectWallet={setCurrentProvider} />
        )}
      </StyledContainer>
      <CryptoNews />
    </>
  );
};

export default Main;

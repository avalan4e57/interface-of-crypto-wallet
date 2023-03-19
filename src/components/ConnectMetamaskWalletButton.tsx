import Button from "@mui/material/Button";
import { FC, useEffect, useState } from "react";
import { connectMetaMaskWallet } from "@/utils/connectMetamaskWallet";

type Props = {
  onConnectWallet: () => void;
};

const ConnectMetamaskWalletButton: FC<Props> = ({ onConnectWallet }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const connectWallet = async () => {
      try {
        await connectMetaMaskWallet();
        onConnectWallet();
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      connectWallet();
    }
  }, [loading, onConnectWallet]);
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => setLoading(true)}
      disabled={loading}
    >
      {loading ? `Connecting...` : `Connect Wallet`}
    </Button>
  );
};

export default ConnectMetamaskWalletButton;

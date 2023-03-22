import Button from "@mui/material/Button";
import { FC, useEffect, useState } from "react";
import { connectMetaMaskWallet } from "@/utils/connectMetamaskWallet";
import { Grid } from "@mui/material";

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
    <Grid container justifyContent="center">
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setLoading(true)}
          disabled={loading}
        >
          {loading ? `Connecting...` : `Connect Wallet`}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ConnectMetamaskWalletButton;

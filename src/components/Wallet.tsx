import { FC } from "react";
import CryptoAssets from "./CryptoAssets";
import TokenTransfer from "./TokenTransfer";
import { useCryptoAssets } from "@/hooks/useCryptoAssets";
import { useWallet } from "@/contexts/WalletContext";
import { isChainSupported } from "@/utils/isChainSupported";
import { Grid } from "@mui/material";
import WalletUnsupportedNetwork from "./Wallet.UnsupportedNetwork";

const Wallet: FC = () => {
  const { assets, refetchBalances, loading } = useCryptoAssets();
  const { networkId } = useWallet();

  if (networkId && !isChainSupported(networkId)) {
    return <WalletUnsupportedNetwork />;
  }

  return (
    <Grid
      container
      item
      xs={10}
      justifyContent="space-between"
      spacing={2}
      sx={{
        margin: "auto",
      }}
    >
      <Grid item xs={12} md={4}>
        <CryptoAssets cryptoAssets={assets} loading={loading} />
      </Grid>
      <Grid item xs={12} md={6}>
        <TokenTransfer
          assets={assets}
          refetchBalances={refetchBalances}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};
export default Wallet;

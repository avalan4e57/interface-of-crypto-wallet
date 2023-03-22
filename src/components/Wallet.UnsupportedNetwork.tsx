import { Alert, AlertTitle, Grid } from "@mui/material";
import { FC } from "react";
import SupportedChainsList from "./SupportedChainsList";

const WalletUnsupportedNetwork: FC = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Alert severity="warning">
          <AlertTitle>Unsupported Network</AlertTitle>
          To use this app please connect to one of the following chains:
          <strong>
            <SupportedChainsList />
          </strong>
        </Alert>
      </Grid>
    </Grid>
  );
};

export default WalletUnsupportedNetwork;

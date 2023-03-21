import { Alert, Snackbar } from "@mui/material";
import { FC } from "react";

type TokenTransferSnackbarProps = {
  open: boolean;
  type: "success" | "error" | undefined;
  onClose: () => void;
};

const TokenTransferSnackbar: FC<TokenTransferSnackbarProps> = ({
  open,
  type,
  onClose,
}) => {
  return (
    <Snackbar
      open={open && typeof type !== "undefined"}
      autoHideDuration={6000}
      onClose={onClose}
    >
      {type === "success" ? (
        <Alert severity="success">Tokens transferred successfully!</Alert>
      ) : (
        <Alert severity="error">Error transferring tokens!</Alert>
      )}
    </Snackbar>
  );
};

export default TokenTransferSnackbar;

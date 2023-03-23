import { Alert, AlertTitle } from "@mui/material";
import { FC } from "react";

type FallBackComponentProps = {
  error: Error;
};

const FallbackComponent: FC<FallBackComponentProps> = ({ error }) => {
  return (
    <Alert severity="error">
      <AlertTitle>Something went wrong</AlertTitle>
      <pre>{error.message}</pre>
    </Alert>
  );
};

export default FallbackComponent;

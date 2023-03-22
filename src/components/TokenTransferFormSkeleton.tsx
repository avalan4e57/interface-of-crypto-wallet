import { Skeleton } from "@mui/material";
import { FC } from "react";

const TokenTransferFormSkeleton: FC = () => {
  return (
    <>
      <Skeleton variant="rounded" width="20%" height={50} />
      <Skeleton
        variant="rounded"
        width="100%"
        height={50}
        sx={{ marginTop: 1 }}
      />
      <Skeleton
        variant="rounded"
        width="100%"
        height={50}
        sx={{ marginTop: 1 }}
      />
      <Skeleton
        variant="rounded"
        width="40%"
        height={50}
        sx={{ marginTop: 1 }}
      />
    </>
  );
};

export default TokenTransferFormSkeleton;

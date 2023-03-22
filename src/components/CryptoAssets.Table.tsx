import { CryptoAssetView } from "@/types";
import styled from "@emotion/styled";
import {
  TableCell,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Skeleton,
} from "@mui/material";
import { FC } from "react";

const StyledTableHeadCell = styled(TableCell)`
  background-color: #f5f5f5;
`;

type CryptoAssetsTableProps = {
  cryptoAssets: Array<CryptoAssetView>;
  loading: boolean;
};

const CryptoAssetsTable: FC<CryptoAssetsTableProps> = ({
  cryptoAssets,
  loading,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          width: "100%",
        }}
      >
        <TableHead>
          <TableRow>
            <StyledTableHeadCell>Symbol</StyledTableHeadCell>
            <StyledTableHeadCell>Balance</StyledTableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(cryptoAssets.length === 0 || loading) && (
            <TableRow>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            cryptoAssets.map((cryptoAsset) => (
              <TableRow key={cryptoAsset.address}>
                <TableCell>{cryptoAsset.symbol}</TableCell>
                <TableCell>{cryptoAsset.balance}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CryptoAssetsTable;

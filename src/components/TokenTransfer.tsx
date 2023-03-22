import transferABI from "@/abi/transferABI";
import { useWallet } from "@/contexts/WalletContext";
import { useWeb3 } from "@/contexts/Web3Context";
import { CryptoAsset } from "@/types";
import { FC, useCallback, useState } from "react";
import TokenTransferForm from "./TokenTransfer.Form";
import { TokenTransferFormData } from "./TokenTransfer.types";
import TokenTransferSnackbar from "./TokenTransfer.Snackbar";
import { styled } from "@mui/material";
import TokenTransferFormSkeleton from "./TokenTransferFormSkeleton";

const StyledForm = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginTop: 20,
  },
}));

type TokenTransferProps = {
  assets: CryptoAsset[];
  refetchToken: (tokenAddress: string) => void;
  loading: boolean;
};

const TokenTransfer: FC<TokenTransferProps> = ({
  assets,
  refetchToken,
  loading,
}) => {
  const { web3 } = useWeb3();
  const { account, networkId } = useWallet();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState<"success" | "error">();
  const [isTransfering, setIsTransfering] = useState(false);

  const closeSnackbar = useCallback(() => {
    setSnackbarOpen(false);
    setSnackbarType(undefined);
  }, []);

  const showSuccessSnackbar = useCallback(() => {
    setSnackbarType("success");
    setSnackbarOpen(true);
  }, []);

  const showErrorSnackbar = useCallback(() => {
    setSnackbarType("error");
    setSnackbarOpen(true);
  }, []);

  // @TODO: Hide in hook. Contract in token. No web3 outside token contract instance
  const transferTokens = async (
    token: CryptoAsset,
    data: TokenTransferFormData
  ) => {
    const { amount, currency: tokenAddress, walletAddress } = data;

    if (web3 && account) {
      if (tokenAddress === assets[0].address) {
        try {
          const tx = await web3.eth.sendTransaction({
            from: account,
            to: walletAddress,
            value: +token.toBasicUnit(amount),
          });
          console.log("success", tx);
          showSuccessSnackbar();
        } catch (err) {
          console.error(err);
          showErrorSnackbar();
        } finally {
          refetchToken(tokenAddress);
        }
      } else {
        const contractInstance = new web3.eth.Contract(
          transferABI,
          tokenAddress
        );
        try {
          setIsTransfering(true);
          await contractInstance.methods
            .transfer(walletAddress, token.toBasicUnit(amount))
            .send({ from: account });
          showSuccessSnackbar();
        } catch (err) {
          console.error(err);
          showErrorSnackbar();
        } finally {
          refetchToken(tokenAddress);
          setIsTransfering(false);
        }
      }
    }
  };

  if (!assets.length || loading) {
    return (
      <StyledForm>
        <TokenTransferFormSkeleton />
      </StyledForm>
    );
  }

  return (
    <>
      <StyledForm>
        <TokenTransferForm
          key={`${account}-${networkId}`}
          assets={assets}
          onSubmit={transferTokens}
          isSubmitting={isTransfering}
        />
      </StyledForm>
      <TokenTransferSnackbar
        open={snackbarOpen}
        type={snackbarType}
        onClose={closeSnackbar}
      />
    </>
  );
};

export default TokenTransfer;

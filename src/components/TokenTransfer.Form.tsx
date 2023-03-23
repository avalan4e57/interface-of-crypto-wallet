import { CryptoAsset } from "@/types";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import BigNumber from "bignumber.js";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { TokenTransferFormData } from "./TokenTransfer.types";
import isAddress from "@/utils/isAddress";

type TokenTransferFormProps = {
  assets: CryptoAsset[];
  onSubmit: (token: CryptoAsset, data: TokenTransferFormData) => Promise<void>;
  isSubmitting: boolean;
};

const TokenTransferForm: FC<TokenTransferFormProps> = ({
  assets,
  onSubmit,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TokenTransferFormData>({
    defaultValues: {
      currency: assets[0].address,
      walletAddress: "",
      amount: "",
    },
  });
  console.log("errors", errors);

  const onSubmitForm = async (data: TokenTransferFormData) => {
    const token = assets.find((asset) => asset.address === data.currency);
    if (!token) return;
    const { amount } = data;
    const transactionAmount = new BigNumber(token.toBasicUnit(amount));
    const totalBalance = new BigNumber(token.balance);

    if (totalBalance.isLessThan(transactionAmount)) {
      setError("amount", {
        type: "manual",
        message: "Insufficient balance",
      });
      return;
    }

    onSubmit(token, data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <FormControl>
        <InputLabel htmlFor="currency-select">Currency</InputLabel>
        <Select
          native
          {...register("currency")}
          inputProps={{
            name: "currency",
            id: "currency-select",
            "aria-label": "currency-select",
          }}
        >
          {assets.map((asset) => (
            <option key={asset.address} value={asset.address}>
              {asset.symbol}
            </option>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Receiver Wallet Address"
        fullWidth
        margin="normal"
        {...register("walletAddress", {
          required: "Required",
          validate: (value) => isAddress(value) || "Invalid address",
        })}
        error={!!errors.walletAddress}
        inputProps={{
          "aria-required": "true",
          "aria-label": "Receiver Wallet Address",
        }}
      />
      {errors.walletAddress && (
        <FormHelperText error>{errors.walletAddress.message}</FormHelperText>
      )}

      <TextField
        label="Amount"
        fullWidth
        margin="normal"
        {...register("amount", {
          required: "Required",
          validate: (value) => {
            if (isNaN(+value)) return "Invalid amount";
            if (+value <= 0) return "Amount must be greater than 0";
          },
        })}
        error={!!errors.amount}
        inlist={{
          "aria-label": "Amount",
          "aria-required": "true",
        }}
      />
      {errors.amount && (
        <FormHelperText error>{errors.amount.message}</FormHelperText>
      )}

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting}
        aria-label="Send crypto"
      >
        {isSubmitting ? "Sending..." : "Send crypto"}
      </Button>
    </form>
  );
};

export default TokenTransferForm;

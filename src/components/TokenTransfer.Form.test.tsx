import { act, fireEvent, render, screen } from "@testing-library/react";
import { CryptoAsset } from "@/types";
import TokenTransferForm from "./TokenTransfer.Form";
import userEvent from "@testing-library/user-event";

const onSubmit = jest.fn();

const assets: CryptoAsset[] = [
  {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    balance: "100000000",
    toBasicUnit: (amount: string) => amount,
    toMainUnit: (amount: string) => amount,
    transferTokens: () => Promise.resolve(),
    isNativeToken: true,
    contract: undefined,
    account: "0x6B175474E89094C44Da98b854EedeAC495271d0F",
  },
  {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "USDC",
    balance: "1000000000",
    toBasicUnit: (amount: string) => amount,
    toMainUnit: (amount: string) => amount,
    transferTokens: () => Promise.resolve(),
    isNativeToken: false,
    contract: undefined,
    account: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
];

describe("TokenTransferForm", () => {
  it("should render select currency input", () => {
    render(
      <TokenTransferForm
        assets={assets}
        onSubmit={onSubmit}
        isSubmitting={false}
      />
    );
    const selectCurrencyInput = screen.getByLabelText("currency-select");
    expect(selectCurrencyInput).toBeInTheDocument();
    expect(selectCurrencyInput).toHaveValue(
      "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    );
    expect(selectCurrencyInput).toHaveTextContent("DAI");

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent("DAI");
    expect(options[1]).toHaveTextContent("USDC");
  });
  it("should render receiver address input and amount input", () => {
    render(
      <TokenTransferForm
        assets={assets}
        onSubmit={onSubmit}
        isSubmitting={false}
      />
    );
    const receiverAddressInput = screen.getByLabelText(
      "Receiver Wallet Address"
    );
    expect(receiverAddressInput).toBeInTheDocument();
    expect(receiverAddressInput).toHaveValue("");
    expect(receiverAddressInput).toBeRequired();

    const amountInput = screen.getByLabelText("Amount");
    expect(amountInput).toBeInTheDocument();
    expect(amountInput).toHaveValue("");
    expect(receiverAddressInput).toBeRequired();
  });

  it("should render submit button in default state", () => {
    render(
      <TokenTransferForm
        assets={assets}
        onSubmit={onSubmit}
        isSubmitting={false}
      />
    );
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
    expect(submitButton).toHaveTextContent("Send crypto");
  });
  it("should render submit button in submitting state", () => {
    render(
      <TokenTransferForm
        assets={assets}
        onSubmit={onSubmit}
        isSubmitting={true}
      />
    );
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Sending...");
  });
  it("should render error message when receiver address is invalid", async () => {
    render(
      <TokenTransferForm
        assets={assets}
        onSubmit={onSubmit}
        isSubmitting={false}
      />
    );
    const receiverAddressInput = screen.getByLabelText(
      "Receiver Wallet Address"
    );
    const submitButton = screen.getByRole("button");
    await act(async () => {
      await userEvent.type(receiverAddressInput, "0x123");
      await fireEvent.submit(submitButton);
    });
    const errorMessage = screen.getByText("Invalid address");
    expect(errorMessage).toBeInTheDocument();
  });
  it("should render error message when amount is not a positive floating point", async () => {
    render(
      <TokenTransferForm
        assets={assets}
        onSubmit={onSubmit}
        isSubmitting={false}
      />
    );
    const amountInput = screen.getByLabelText("Amount");
    const submitButton = screen.getByRole("button");
    await act(async () => {
      await userEvent.type(amountInput, "0");
      await fireEvent.submit(submitButton);
    });
    let errorMessage: HTMLElement;
    errorMessage = screen.getByText("Amount must be greater than 0");
    expect(errorMessage).toBeInTheDocument();

    userEvent.clear(amountInput);
    await act(async () => {
      await userEvent.type(amountInput, "-1");
      await fireEvent.submit(submitButton);
    });
    errorMessage = screen.getByText("Amount must be greater than 0");
    expect(errorMessage).toBeInTheDocument();

    userEvent.clear(amountInput);
    await act(async () => {
      await userEvent.type(amountInput, "1.1.1");
      await fireEvent.submit(submitButton);
    });
    errorMessage = screen.getByText("Invalid amount");
    expect(errorMessage).toBeInTheDocument();

    userEvent.clear(amountInput);
    await act(async () => {
      await userEvent.type(amountInput, "invalidamount");
      await fireEvent.submit(submitButton);
    });
    errorMessage = screen.getByText("Invalid amount");
    expect(errorMessage).toBeInTheDocument();
    userEvent.clear(amountInput);
  });
});

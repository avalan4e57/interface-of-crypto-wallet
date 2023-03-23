import { render, screen } from "@testing-library/react";
import CryptoAssetsTable from "./CryptoAssets.Table";
import { CryptoAssetView } from "@/types";

const cryptoAssets: CryptoAssetView[] = [
  {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    balance: "100000000000000000000",
  },
  {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "USDC",
    balance: "100000000000000000000",
  },
];

describe("CryptoAssetsTable", () => {
  it("renders a table with two columns: Symbol and Balance", () => {
    render(<CryptoAssetsTable cryptoAssets={cryptoAssets} loading={false} />);
    expect(screen.getByText("Symbol")).toBeInTheDocument();
    expect(screen.getByText("Balance")).toBeInTheDocument();
  });
  it("renders a table with two rows", () => {
    render(<CryptoAssetsTable cryptoAssets={cryptoAssets} loading={false} />);
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });
  it("renders a table with two rows and two columns", () => {
    render(<CryptoAssetsTable cryptoAssets={cryptoAssets} loading={false} />);
    expect(screen.getAllByRole("cell")).toHaveLength(4);
  });
  it("renders a table with two rows and two columns with the correct data", () => {
    render(<CryptoAssetsTable cryptoAssets={cryptoAssets} loading={false} />);
    expect(screen.getByText("DAI")).toBeInTheDocument();
    expect(screen.getByText("USDC")).toBeInTheDocument();
    const balances = screen.getAllByText("100000000000000000000");
    expect(balances).toHaveLength(2);
  });
  it("renders a header when loading is true", () => {
    render(<CryptoAssetsTable cryptoAssets={cryptoAssets} loading={true} />);
    expect(screen.getByText("Symbol")).toBeInTheDocument();
    expect(screen.getByText("Balance")).toBeInTheDocument();
  });
  it("renders a header when loading is true and one Skeleton row and no rows with data", () => {
    render(<CryptoAssetsTable cryptoAssets={cryptoAssets} loading={true} />);
    const header = screen.getByLabelText("crypto-assets-table-header");
    expect(header).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(2);
    const skeletonRow = screen.getByLabelText("skeleton-row");
    expect(skeletonRow).toBeInTheDocument();
    expect(skeletonRow.children).toHaveLength(2);

    expect(screen.queryByText("DAI")).not.toBeInTheDocument();
    expect(screen.queryByText("USDC")).not.toBeInTheDocument();
  });
});

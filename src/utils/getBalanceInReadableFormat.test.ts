import getBalanceInReadableFormat from "./getBalanceInReadableFormat";

describe("getBalanceInReadableFormat", () => {
  it("should return the balance in a readable format", () => {
    const balance = "1000000000000000000";
    const decimals = "18";
    const precision = 5;
    const expected = "1.00000";
    const result = getBalanceInReadableFormat(balance, decimals, precision);
    expect(result).toEqual(expected);
  });
});

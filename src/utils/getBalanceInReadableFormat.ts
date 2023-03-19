import BigNumber from "bignumber.js";

/**
 * A function to get the balance of a token in a readable format
 * @param balance a string representing the balance of a token
 * @param decimals a string representing the number of decimals of a token
 * @param precision a number representing the number of decimal places to show;
 * set to 5 by default
 * @returns a string representing the balance of a token in a readable format
 */
function getBalanceInReadableFormat(
  balance: string,
  decimals: string,
  precision = 5
) {
  return new BigNumber(balance)
    .div(new BigNumber(10).pow(new BigNumber(decimals)))
    .toFixed(precision);
}

export default getBalanceInReadableFormat;

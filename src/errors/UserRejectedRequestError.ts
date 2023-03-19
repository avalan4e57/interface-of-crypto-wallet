/**
 * @name UserRejectedRequestError
 * @description EIP-1193 userRejectedRequest error. Thrown if the user rejected the request to connect to MetaMask.
 */
class UserRejectedRequestError extends Error {
  code: number;

  constructor(message?: string) {
    super(message);
    this.name = "UserRejectedRequestError";
    this.code = 4001;
  }
}

export default UserRejectedRequestError;

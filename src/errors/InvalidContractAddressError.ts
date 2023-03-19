/**
 * @name InvalidContractAddressError
 * @description Thrown if the contract address is invalid.
 * @param {string} message Error message
 * @param {string} contractAddress Contract address
 * @example new InvalidContractAddressError("Invalid contract address", "0x1234")
 * @extends Error
 * @property {string} name Error name
 * @property {string} contractAddress Contract address
 */
class InvalidContractAddressError extends Error {
  contractAddress: string | undefined;

  constructor(message?: string, contractAddress?: string) {
    super(message);
    if (!message?.length) {
      this.message = "Invalid contract address";
    }
    this.name = "InvalidContractAddressError";
    this.contractAddress = contractAddress;
  }
}

export default InvalidContractAddressError;

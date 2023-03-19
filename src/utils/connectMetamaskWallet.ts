import detectEthereumProvider from "@metamask/detect-provider";
import { hasProp } from "./hasProp";

async function isMetamaskInstalled() {
  const provider = await detectEthereumProvider();
  if (!provider || !("ethereum" in window)) {
    console.log("Please install MetaMask!");
    return false;
  }
  if (provider !== window.ethereum) {
    console.error("Do you have multiple wallets installed?");
    return false;
  }
  return true;
}

function getAccount(accounts: Array<string> | undefined) {
  if (!accounts || accounts.length === 0) {
    console.log("Please connect to MetaMask.");
    throw new Error("No accounts found");
  }
  return accounts[0];
}

export async function connectMetaMaskWallet() {
  try {
    const metamaskInstalled = await isMetamaskInstalled();

    if (!metamaskInstalled) {
      return;
    }
    // TODO: Figure out how to type this
    // @ts-expect-error
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = getAccount(accounts);
    console.log("Metamask wallet connected", account);
  } catch (err) {
    if (hasProp(err, "code") && err.code === 4001) {
      console.log("Please connect to MetaMask.");
    } else {
      console.error(err);
    }
  }
}

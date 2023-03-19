import { SupportedChains, SupportedWallets } from "@/enums";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWeb3 } from "./Web3Context";
import Web3 from "web3";

type WalletContextType = {
  account?: string;
  networkId?: number;
  wallet?: SupportedWallets;
};

const WalletContext = createContext<WalletContextType>({
  account: undefined,
  networkId: undefined,
  wallet: undefined,
});

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error(`useWallet must be used within a WalletProvider`);
  }
  return context;
}

const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  const { web3 } = useWeb3();

  const [account, setAccount] = useState<string>();
  const [networkId, setNetworkId] = useState<SupportedChains>();
  const [wallet, setWallet] = useState<SupportedWallets>();

  useEffect(() => {
    if (web3) {
      const { isMetaMask } = Web3.givenProvider;
      if (isMetaMask) {
        setWallet(SupportedWallets.MetaMask);
      } else {
        setWallet(undefined);
      }
    }
  }, [web3]);

  useEffect(() => {
    let ignore = false;
    if (web3?.eth) {
      web3.eth.getAccounts().then((accounts) => {
        if (!ignore && accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [web3?.eth]);

  useEffect(() => {
    let ignore = false;
    if (web3?.eth) {
      web3.eth.net.getId().then((networkId) => {
        if (!ignore && SupportedChains[networkId]) {
          setNetworkId(networkId);
        } else if (!ignore) {
          setNetworkId(SupportedChains.NOT_SUPPORTED);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [web3?.eth]);

  useEffect(() => {
    if (wallet === SupportedWallets.MetaMask) {
      Web3.givenProvider.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });
      Web3.givenProvider.on("chainChanged", (networkId: string) => {
        const networkIdNumber = parseInt(networkId);
        if (SupportedChains[networkIdNumber]) {
          setNetworkId(networkIdNumber);
        } else {
          setNetworkId(SupportedChains.NOT_SUPPORTED);
        }
      });
    }

    return () => {
      Web3.givenProvider.removeAllListeners("accountsChanged");
      Web3.givenProvider.removeAllListeners("chainChanged");
    };
  }, [wallet]);

  return (
    <WalletContext.Provider value={{ account, networkId, wallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;

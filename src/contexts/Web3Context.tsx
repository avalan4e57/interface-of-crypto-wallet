import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  FC,
  PropsWithChildren,
} from "react";
import Web3 from "web3";

const Web3Context = createContext<{
  web3: Web3 | undefined;
  setWeb3: React.Dispatch<React.SetStateAction<Web3 | undefined>>;
  setCurrentProvider: () => void;
}>({
  web3: undefined,
  setWeb3: () => {},
  setCurrentProvider: () => {},
});

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error(`useWeb3 must be used within a Web3Provider`);
  }
  return context;
}

const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3>();

  const setCurrentProvider = () => setWeb3(Web3.givenProvider);

  useEffect(() => {
    const setProviderIfWalletConnected = async () => {
      if (Web3.givenProvider) {
        const provider = new Web3(Web3.givenProvider);
        const accounts = await provider?.eth.getAccounts();
        if (accounts && accounts.length > 0) {
          setWeb3(provider);
        }
      }
    };
    setProviderIfWalletConnected();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, setWeb3, setCurrentProvider }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;

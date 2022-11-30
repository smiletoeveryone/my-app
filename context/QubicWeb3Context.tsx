// Qubic Wallet
import { Network } from "@qubic-js/core";
import { QubicConnector } from "@qubic-js/react";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { ReactChild, useCallback } from "react";
import Web3 from "web3";

import MetalionABI from "../contracts/MetalionABI.json";
const contractAddress = "0x0EC6a1578b73E6a562c471C0a33944cBaB8A431f";

const qubicConnector = new QubicConnector({
  apiKey: process.env.NEXT_PUBLIC_QUBIC_API_KEY as string,
  apiSecret: process.env.NEXT_PUBLIC_QUBIC_API_SECRET as string,
  chainId: 80001,
  infuraProjectId: process.env.NEXT_PUBLIC_INFURA_ID as string,
  // optional, default: false, when value is true, the popup will hide automatically
  autoHideWelcome: true,
  // optional, default: false, when value is true, the show iframe instead of new window, credit card payment will failed with this option value true
  enableIframe: true,
  // optional, default is `https://wallet.qubic.app/`
  walletUrl: "https://wallet.qubic.app/",
});

interface Props {
  children: ReactChild;
}

export const QubicWeb3ContextProvider = ({ children }: Props) => {
  const library = (provider: any): Web3 => {
    console.log({
      "provider.isQubic": provider.isQubic,
    });
    return new Web3(provider);
  };

  return <Web3ReactProvider getLibrary={library}>{children}</Web3ReactProvider>;
};

export function useQubicHook() {
  const context = useWeb3React();
  const { account, chainId, activate, library: web3 } = context;

  const handleQubicSignInUp = useCallback(() => {
    activate(qubicConnector, (e: Error): void => {
      console.error(e);
    });
  }, [activate]);

  const handleQubicNftMint = useCallback(
    (options: { targetNetwork: Network; contractAddress: string }) => {
      if (!web3 || !account) return;
      const { targetNetwork, contractAddress } = options;

      if (chainId !== targetNetwork) {
        window.alert(`Network should be chain id: ${targetNetwork}`);
        return;
      }
      const mineTestContract = new web3.eth.Contract(
        MetalionABI.abi,
        contractAddress
      );
      mineTestContract.methods
        .mint(account)
        .send({ from: account, value: web3.utils.toBN(100000000000000000) })
        .on("error", (mintError: Error): void => {
          console.error(mintError);
        })
        .once("transactionHash", (hash: string) => {
          console.log("MINT SUCCESSFUL!!!!!!!!!!!!!!!!!", hash);
          console.log(hash);
        })
        .once("receipt", (receipt: any) => {
          console.log("MINT SUCCESSFUL!!!!!!!!!!!!!!!!!", receipt);
        });
    },
    [account, chainId, web3]
  );

  const handleMumbaiMint = useCallback(async () => {
    handleQubicNftMint({
      targetNetwork: Network.MUMBAI,
      contractAddress,
    });
  }, [handleQubicNftMint]);

  return {
    ...context,
    handleQubicSignInUp,
    handleQubicNftMint,
    handleMumbaiMint,
  };
}

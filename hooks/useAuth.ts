import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { useWeb3Context } from "../context/Web3Context";
import { useRouter } from "next/router";

// Qubic
import { Network } from "@qubic-js/core";
import { useWeb3React } from "@web3-react/core";
import { QubicConnector } from "@qubic-js/react";

import { isMainnet } from "../constants/mintday";

const rightChainId = isMainnet ? Network.POLYGON : Network.MUMBAI;
const rightParams = isMainnet
  ? [
      {
        chainId: "0x89",
        rpcUrls: ["https://rpc-mainnet.matic.network/"],
        chainName: "Matic Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://polygonscan.com/"],
      },
    ]
  : [
      {
        chainId: "0x13881",
        rpcUrls: ["https://rpc-mumbai.matic.today"],
        chainName: "Mumbai Testnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://polygonscan.com/"],
      },
    ];

const qubicConnector = new QubicConnector({
  apiKey: process.env.NEXT_PUBLIC_QUBIC_API_KEY as string,
  apiSecret: process.env.NEXT_PUBLIC_QUBIC_API_SECRET as string,
  chainId: rightChainId,
  infuraProjectId: process.env.NEXT_PUBLIC_INFURA_ID as string,
  // optional, default: false, when value is true, the popup will hide automatically
  autoHideWelcome: true,
  // optional, default: false, when value is true, the show iframe instead of new window, credit card payment will failed with this option value true
  enableIframe: true,
  // optional, default is `https://wallet.qubic.app/`
  walletUrl: "https://wallet.qubic.app/",
});

export type JWTokens = { token: string; refresh_token: string };

export const useAuth = () => {
  const { push } = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { connect, web3Provider, network, address, disconnect } =
    useWeb3Context();

  // Qubic Integration -----------------
  const { account, chainId, activate, deactivate } = useWeb3React();

  const handleQubicSignInUp = useCallback(() => {
    activate(qubicConnector, (e: Error): void => {
      console.error(e);
    });
  }, [activate]);

  const isWrongNetwork = network?.chainId !== rightChainId;

  async function handleChangeNetwork() {
    if (window.ethereum) {
      console.log(window.ethereum);
    } else {
      console.log("ethereum not found");
    }

    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: rightParams,
    });
  }

  const getJWTs = () => {
    const { token, refresh_token } = cookies;
    return { token, refresh_token };
  };

  // always fetch latest from Cookie
  const [jwts, setJWTs] = useState(getJWTs());

  const removeJWTs = useCallback(() => {
    // remove JWTs
    removeCookie("token");
    removeCookie("refresh_token");
    setJWTs({ token: undefined, refresh_token: undefined });
  }, [removeCookie]);

  const saveJWTs = useCallback(
    (_jwts: JWTokens) => {
      setCookie("token", _jwts.token, { path: "/", maxAge: 3600 });
      setCookie("refresh_token", _jwts.refresh_token, { path: "/" });
      setJWTs(_jwts);
    },
    [setCookie]
  );

  const handleConnect = useCallback(async () => {
    deactivate();
    connect?.();
  }, [connect, deactivate]);

  const handleDisconnect = useCallback(
    (redirectURLPath?: string) => () => {
      console.log("disconnect");
      if (web3Provider && address) {
        disconnect?.();
      } else if (account && chainId) {
        deactivate();
      }
      removeJWTs();
      if (redirectURLPath) {
        push(redirectURLPath);
      }
    },
    [
      account,
      address,
      chainId,
      deactivate,
      disconnect,
      push,
      removeJWTs,
      web3Provider,
    ]
  );

  const handleQubicConnect = useCallback(async () => {
    handleDisconnect()();
    await handleQubicSignInUp?.();
  }, [handleDisconnect, handleQubicSignInUp]);

  const isAuth =
    Boolean(web3Provider && address) || Boolean(account && chainId);
  const isConnected = Boolean(network) && web3Provider && Boolean(address);

  return {
    // universal login methods
    connect: handleConnect,
    qubicConnect: handleQubicConnect,
    disconnect: handleDisconnect,
    changeNetwork: handleChangeNetwork,

    // remove JWT
    removeJWTs,
    setJWTs: saveJWTs,

    // quibic
    account,
    chainId,

    // Info on user
    address: address || account,
    isAuth,
    isConnected,
    isWrongNetwork,
    jwts,
  };
};

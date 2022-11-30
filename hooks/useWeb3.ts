import { useEffect, useReducer, useCallback } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useToast } from "@chakra-ui/react";

import {
  Web3ProviderState,
  Web3Action,
  web3InitialState,
  web3Reducer,
} from "../reducers";
import { useCookies } from "react-cookie";
import { useSWRConfig } from "swr";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      rpc: {
        137: "https://polygon-rpc.com",
        80001: "https://matic-mumbai.chainstacklabs.com",
      },
    },
  },
};

let web3Modal: Web3Modal | null;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    // network: process.env.NEXT_PUBLIC_NETWORK_ID, // optional
    cacheProvider: true,
    providerOptions, // required
    theme: "dark",
  });
}

export const useWeb3 = (): Web3ProviderState => {
  const [state, dispatch] = useReducer(web3Reducer, web3InitialState);
  const { isLoading, provider, web3Provider, address, network } = state;
  const [cookies, , removeCookies] = useCookies();
  const { cache } = useSWRConfig();
  const toast = useToast();
  const toastIds = {
    connected: "walletConnected",
    disconnected: "walletDisconnected",
    addressChanged: "walletAddressChanged",
    chainChanged: "walletChainChanged",
  };

  const removeAuthTokens = useCallback(() => {
    if (cookies.token) removeCookies("token");
    if (cookies.refreshToken) removeCookies("refreshToken");
  }, [cookies, removeCookies]);

  const connect = useCallback(async () => {
    if (web3Modal) {
      try {
        const provider = await web3Modal.connect();
        // TODO: make sure handle multi-chain
        const web3Provider = new ethers.providers.Web3Provider(provider, "any");
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();

        if (!toast.isActive(toastIds.connected)) {
          toast({
            id: toastIds.connected,
            title: "錢包連接成功",
            position: "bottom-right",
            status: "success",
            duration: 3000,
            // isClosable: true,
          });
        }

        dispatch({
          type: "SET_WEB3_PROVIDER",
          provider,
          web3Provider,
          address,
          network,
        } as Web3Action);
      } catch (e) {
        console.log("connect error", e);
      }
    } else {
      console.error("No Web3Modal");
    }
  }, [toast, toastIds.connected]);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      //@ts-ignore
      cache.clear(); // clear SWR cache
      web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      removeAuthTokens();
      // toast.error("Disconnected from Web3");
      if (!toast.isActive(toastIds.disconnected)) {
        toast({
          id: toastIds.disconnected,
          title: "中斷錢包連接",
          position: "bottom-right",
          status: "error",
          duration: 3000,
          // isClosable: true,
        });
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      } as Web3Action);
    } else {
      console.error("No Web3Modal");
    }
  }, [cache, provider, removeAuthTokens, toast, toastIds.disconnected]);

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  // EIP-1193 events
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        removeAuthTokens();

        disconnect();
        //@ts-ignore
        cache.clear(); // clear SWR cache

        // if (!toast.isActive(toastIds.addressChanged)) {
        //   toast({
        //     id: toastIds.addressChanged,
        //     title: "變更錢包地址",
        //     position: "bottom-right",
        //     status: "info",
        //     duration: 3000,
        //     // isClosable: true,
        //   });
        // }

        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        } as Web3Action);
      };

      // TODO: https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = async (_hexChainId: string) => {
        removeAuthTokens();

        disconnect();

        //@ts-ignore
        cache.clear(); // clear SWR cache

        if (web3Provider) {
          const network = await web3Provider?.getNetwork();
          dispatch({
            type: "SET_NETWORK",
            network: network,
          } as Web3Action);
        }

        // if (!toast.isActive(toastIds.chainChanged)) {
        //   toast({
        //     id: toastIds.chainChanged,
        //     title: "更換區塊鏈網絡",
        //     position: "bottom-right",
        //     status: "info",
        //     duration: 3000,
        //     // isClosable: true,
        //   });
        // }

        if (typeof window !== "undefined") {
          console.log("switched to chain...", _hexChainId);

          // window.location.reload();
        } else {
          console.log("window is undefined");
        }
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error);
        removeAuthTokens();

        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }

    // if (web3Provider?.on) {
    //   const handleNetworkChanged = (newNetwork, oldNetwork) => {
    //     // When a Provider makes its initial connection, it emits a "network"
    //     // event with a null oldNetwork along with the newNetwork. So, if the
    //     // oldNetwork exists, it represents a changing network
    //     console.log({ oldNetwork, newNetwork });
    //     if (oldNetwork) {
    //       window.location.reload();
    //     }
    //   };

    //   web3Provider.on("network", handleNetworkChanged);

    //   return () => {
    //     if (web3Provider.removeListener) {
    //       web3Provider.removeListener("network", handleNetworkChanged);
    //     }
    //   };
    // }
  }, [
    provider,
    web3Provider,
    disconnect,
    toast,
    removeAuthTokens,
    toastIds.addressChanged,
    toastIds.chainChanged,
    cache,
  ]);

  return {
    isLoading,
    provider,
    web3Provider,
    address,
    network,
    connect,
    disconnect,
  } as Web3ProviderState;
};

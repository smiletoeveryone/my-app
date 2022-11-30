import { ethers } from "ethers";

export type Web3ProviderState = {
  isLoading: boolean | null;
  provider: any;
  web3Provider: ethers.providers.Web3Provider | null | undefined;
  address: string | null | undefined;
  network: ethers.providers.Network | null | undefined;
  connect: (() => Promise<void>) | null;
  disconnect: (() => Promise<void>) | null;
};

export const web3InitialState: Web3ProviderState = {
  isLoading: null,
  provider: null,
  web3Provider: null,
  address: null,
  network: null,
  connect: null,
  disconnect: null,
};

export type Web3Action =
  | {
      type: "LOADING_WEB3_PROVIDER";
      isLoading: Web3ProviderState["isLoading"];
    }
  | {
      type: "SET_WEB3_PROVIDER";
      provider?: Web3ProviderState["provider"];
      web3Provider?: Web3ProviderState["web3Provider"];
      address?: Web3ProviderState["address"];
      network?: Web3ProviderState["network"];
    }
  | {
      type: "SET_ADDRESS";
      address?: Web3ProviderState["address"];
    }
  | {
      type: "SET_NETWORK";
      network?: Web3ProviderState["network"];
    }
  | {
      type: "RESET_WEB3_PROVIDER";
    };

export function web3Reducer(
  state: Web3ProviderState,
  action: Web3Action
): Web3ProviderState {
  switch (action.type) {
    case "LOADING_WEB3_PROVIDER":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        isLoading: false,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        network: action.network,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        isLoading: false,
        address: action.address,
      };
    case "SET_NETWORK":
      return {
        ...state,
        isLoading: false,
        network: action.network,
      };
    case "RESET_WEB3_PROVIDER":
      return { ...web3InitialState, isLoading: false };
    default:
      throw new Error();
  }
}

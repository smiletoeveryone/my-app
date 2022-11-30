import useSWR from "swr";
import { getPortalsApiURI } from "../constants/api";
import { METALION_EVENT_ADDRESS } from "../constants/contracts";
import { useAuthContext } from "../context/AuthContext";

class StatusError extends Error {
  status: number | undefined;
  info: any;
}

export type RedeemOption = {
  option_id: string;
  option_display: string;
  image_url?: string;
};
export type Token = {
  campaign_id: string;
  rid: string;
  id: string;
  network: string;
  contract_address: string;
  token_id: number;
  name: string;
  description: string;
  image: string;
  redeem_options: RedeemOption[];
};
export type Tokens = Token[];

export const useTokens = () => {
  const { address } = useAuthContext();

  const BASE_URI = getPortalsApiURI(process.env.NEXT_PUBLIC_NETWORK_TYPE || "");

  const getTokensData = async () => {
    const data = await fetch(
      `${BASE_URI}/tokens?id=${METALION_EVENT_ADDRESS}&w=${address}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!data.ok) {
      const error = new StatusError(
        "An error occurred while fetching the data."
      );
      // Attach extra info to the error object.
      error.info = await data.json();
      error.status = data.status;
      throw error;
    }

    return data.json();
  };

  const { data, error, isValidating } = useSWR(
    "/api/tokens",
    getTokensData
    // {
    //   dedupingInterval: 10000,
    // }
  );

  return {
    tokens: data?.tokens,
    redeemOptions: data?.redeem_options,
    campaignId: data?.campaign_id,
    contractAddress: data?.tokens?.[0]?.contract_address,
    isLoading: !error && !data && isValidating,
    isError: error,
  };
};

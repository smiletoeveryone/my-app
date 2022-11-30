export const PORTALS_MAIN_API = "https://api.portals.fyi";
export const PORTALS_TESTNET_API = "https://test-api.portals.fyi";

export const NEW_PATH = "v1/portals/redeem";

export const getPortalsApiURI = (networkType: string) =>
  networkType === "mainnet"
    ? `${PORTALS_MAIN_API}/${NEW_PATH}`
    : `${PORTALS_TESTNET_API}/${NEW_PATH}`;

export const AMERICANO_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_NETWORK_TYPE === "mainnet"
    ? "0xea086461b5f9a64416bb22ddf42b64a6b5026c4d"
    : "0xD3F4736cCc6aE629E7f059F7EcDbC8EC0D3Cf086";
export const LATTE_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_NETWORK_TYPE === "mainnet"
    ? "0xeeac3ccd87972e56ba718742a79b14c73439e4b2"
    : "0xE67caf69dEAF976a2e4fc050308C3881d44c89A5";
export const OG_ADDRESS =
  process.env.NEXT_PUBLIC_NETWORK_TYPE === "mainnet"
    ? "0x56d996c6f6c963CA5a5824e9cf6B7145192E0CdD"
    : "0xe3f08b6fe26d0057e310185481bb30b02c5aee25";

export const METALION_EVENT_ADDRESS =
  process.env.NEXT_PUBLIC_NETWORK_TYPE === "mainnet"
    ? "dae50577-3cbb-491b-8435-ebb16c747af6"
    : "ebe99a4c-8c29-4d76-b119-981fa515d4b7";

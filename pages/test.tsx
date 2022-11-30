import { useState } from "react";
import { useCookies } from "react-cookie";
import Page from "../containers/Page";

import { Box, Container, Button, Text } from "@chakra-ui/react";
import { useWeb3Context } from "../context/Web3Context";

export default function Home() {
  // web3
  const { web3Provider, address } = useWeb3Context();
  const [cookies, setCookie] = useCookies();

  // Redreamer states
  const [rdNonce, setRdNonce] = useState(undefined);
  const [rdSignature, setRdSignature] = useState(undefined);
  const [JWTs, setJWTs] = useState(undefined);
  // const [rdTokenId, getRdTokenId] = useState(20);

  // Mithras states
  // const [nonce, setNonce] = useState(undefined);
  const [signature, setSignature] = useState(undefined);
  const [campaignId] = useState(undefined);
  const [tokenId] = useState(20);

  const BASE_URI = "https://testnet-api.redreamer.io/api";
  const TEST_URI = "https://test.mtrs.io";
  const chain = "polygon";

  // get nonce
  const getRdNonce = async () => {
    const data = await fetch(
      `${BASE_URI}/v1/auth/nonce?network=${chain}&address=${address.toLowerCase()}`
    );
    const { nonce: rdNounce } = await data.json();
    console.log({ rdNounce });
    setRdNonce(rdNounce);
  };

  // login auth to get tokens
  const rdLogin = async () => {
    const signer = web3Provider.getSigner();
    const message = `${address.toLowerCase()} ${rdNonce}`;
    const signature_ = await signer.signMessage(message);

    setRdSignature(signature_);
    console.log({ signature_ });

    const reqBody = {
      network: chain,
      address: address.toLowerCase(),
      signature: signature_,
    };

    console.log(JSON.stringify(reqBody));

    const data = await fetch(`${BASE_URI}/v1/auth/login`, {
      method: "POST",
      body: JSON.stringify(reqBody),
    });

    const json = await data.json();
    console.log({ json });
    setJWTs(json);
  };

  // get campaigns
  const getRdCampaigns = async () => {
    const data = await fetch(`${BASE_URI}/v1/passport/${chain}/campaigns`, {
      method: "GET",
      headers: {
        // "Content-type": "application/json",
        Authorization: `Bearer ${JWTs.token}`,
      },
    });
    const json = await data.json();

    console.log({ json });
    // setRdCampaignId();
  };

  // get all tokens
  const getRdTokens = async () => {
    const data = await fetch(
      `${BASE_URI}/v1/passport/${chain}/campaigns/${campaignId}/nfts`,
      {
        headers: {
          Authorization: `Bearer ${JWTs.token}`,
        },
      }
    );
    const json = await data.json();

    console.log({ json });
    // setRdCampaignId();
  };

  const getRdQR = async () => {
    const contract = "0xe3f08b6fe26d0057e310185481bb30b02c5aee25";

    const signer = web3Provider.getSigner();
    const message = `campaign_id:${campaignId},contract_address:${contract},token_id:${tokenId}`;
    const signature = await signer.signMessage(message);

    console.log({ signature });

    // const token_id = 20;
  };

  //   // campaign_id:0988a006-d07c-4b1c-93a9-774651c6216a,contract_address:0xE3f08b6FE26d0057e310185481bb30b02C5AEE25,token_id:20

  // get nonce doesn't work with MITHRAS
  const getNonce = async () => {
    await getRdNonce();
    // const data = await fetch(`${TEST_URI}/v1/redeem/nonce?network=${chain}&address=${address.toLowerCase()}`)
    // const { nonce: _nonce } = await data.json();
    // console.log({ _nonce })
    // setNonce(_nonce);
    // const data = await fetch(`/api/redeem/nonce?network=${chain}&address=${address.toLowerCase()}`)
    // const { nonce: _nonce } = await data.json();
    // console.log({ _nonce })
    // setNonce(_nonce);
  };

  // login auth to get tokens
  const login = async () => {
    const signer = web3Provider.getSigner();
    const message = `${address.toLowerCase()} ${rdNonce}`;
    const signature_ = await signer.signMessage(message);

    setSignature(signature_);
    console.log({ signature_ });

    const reqBody = {
      network: chain,
      address: address.toLowerCase(),
      signature: signature_,
    };

    console.log(reqBody);

    const data = await fetch(`${TEST_URI}/v1/redeem/login`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "Content-type",
      },
      body: JSON.stringify(reqBody),
    });
    const { token, refresh_token } = await data.json();

    setCookie("token", token, { path: "/" });
    setCookie("refreshToken", refresh_token, { path: "/" });

    // document.cookie(`refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=None`);
    // document.cookie(`token=${token}; Path=/; Expires=Wed, 04 May 2022 01:33:52 GMT; HttpOnly; Secure; SameSite=None`);

    const headers = data.headers;
    const hValues = headers.get("set-cookie");
    console.log({ headers, hValues });

    // const json = await data.json();
    // console.log({ json })
    // setJWTs(json);
  };

  const getAuthStatus = async () => {
    const data = await fetch(`${TEST_URI}/v1/redeem/status`, {
      // credentials: "include",
    });
    const { isAuthenticated } = await data.json();

    return isAuthenticated;
  };

  // This API is the core that utilizes REDREAMER’s campaign and NFT APIs, consolidate the results into single API that builds the relationship between the two. This helps skipping an API call in the frontend and enables multi-select campaign for a particular NFT.
  let cId, contractAdd, tId;
  const getTokens = async () => {
    // const data = await fetch(`https://c14b-98-248-224-61.ngrok.io/v1/redeem/tokens`, {
    const data = await fetch(`${TEST_URI}/v1/redeem/tokens`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies["token"]}`,
      },
    });

    const json = await data.json();

    tId = json.tokens[0].token_id;
    cId = json.tokens[0].campaigns[0].id;
    contractAdd = json.tokens[0].campaigns[0].contract_addresses[0];
  };
  const getQR = async () => {
    const signer = web3Provider.getSigner();
    const message = `campaign_id:${cId},contract_address:${contractAdd},token_id:${tId}`;
    const signature = await signer.signMessage(message);

    console.log({ signature });

    // const token_id = 20;

    // const reqBody = {
    //   campaign_id: cId,
    //   contract_address: contractAdd,
    //   signature,
    //   token_id: tId,
    // };
  };

  // --------------------------
  const testLogin = async () => {
    const signer = web3Provider.getSigner();
    const message = `${address.toLowerCase()} ${rdNonce}`;
    const signature_ = await signer.signMessage(message);

    setSignature(signature_);
    console.log({ signature_ });

    const reqBody = {
      network: chain,
      address: address.toLowerCase(),
      signature: signature_,
    };

    console.log(reqBody);
  };

  return (
    <Page pageRoute="Home">
      {/* <Hero />
      <ConnectWallet /> */}
      <Container p={5} w="full" alignItems="center" justifyContent="center">
        <Box display="block">
          <Text>Redreamer API</Text>
          <p>Nonce: {rdNonce ? rdNonce : ""}</p>
          <p>Signature: {rdSignature ? rdSignature : ""}</p>
          <p>JWT: {JWTs && JWTs.token}</p>
        </Box>
        <Box display="block">
          <Button colorScheme="pink" onClick={getRdNonce}>
            getNonce
          </Button>
          <Button colorScheme="pink" onClick={rdLogin}>
            login
          </Button>
          <Button colorScheme="pink" onClick={getRdCampaigns}>
            get Campaigns
          </Button>
          <Button colorScheme="pink" onClick={getRdTokens}>
            get Tokens
          </Button>
          <Button colorScheme="pink" onClick={getRdQR}>
            get QR code
          </Button>
        </Box>
      </Container>
      <Container p={5} w="full" alignItems="center" justifyContent="center">
        <Box display="block">
          <Text>Mithras API</Text>
          <p>Nonce: {rdNonce ? rdNonce : ""}</p>
          <p>Signature: {signature && signature}</p>
        </Box>
        <Button colorScheme="teal" onClick={getNonce}>
          getNonce
        </Button>
        <Button colorScheme="teal" onClick={login}>
          login
        </Button>
        <Button colorScheme="teal" onClick={getAuthStatus}>
          get Auth status
        </Button>
        <Button colorScheme="teal" onClick={getTokens}>
          get Tokens
        </Button>
        <Button colorScheme="teal" onClick={getQR}>
          get QR code
        </Button>
      </Container>
      <Container p={5} w="full" alignItems="center" justifyContent="center">
        <Box display="block">
          <Text>NEXTJS API</Text>
          <p>Nonce: {rdNonce ? rdNonce : ""}</p>
          <p>Signature: {signature && signature}</p>
        </Box>
        <Button colorScheme="teal" onClick={getNonce}>
          getNonce
        </Button>
        <Button colorScheme="teal" onClick={testLogin}>
          NEXTJS login
        </Button>
      </Container>
    </Page>
  );
}

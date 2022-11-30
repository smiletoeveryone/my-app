import { useState, useCallback } from "react";
import NextLink from "next/link";
// Qubic Wallet
import { useWeb3React } from "@web3-react/core";
import { Network } from "@qubic-js/core";
import { AbstractProvider } from "web3-core";

import { Box, Button, Heading, Stack } from "@chakra-ui/react";

import MetalionABI from "../contracts/MetalionABI.json";
import { useAuthContext } from "../context/AuthContext";

import { ethers } from "ethers";
import {
  isMainnet,
  isSaleStarted,
  AMERICANO_PRICE,
  LATTE_PRICE,
} from "../constants/mintday";

export default function QubicMint({
  contractAddress,
  coffeeType,
  colorType,
}: {
  contractAddress: string;
  coffeeType: string;
  colorType: string;
}) {
  // Qubic Integration -----------------
  const context = useWeb3React();
  const { account, chainId, library: web3, connector } = context;

  const MINT_PRICE = coffeeType === "美式" ? AMERICANO_PRICE : LATTE_PRICE;

  const QUBIC_MINT_PRICE = ethers.utils
    .parseEther(MINT_PRICE as string)
    .toString();

  console.log("QUBIC_MINT_PRICE", QUBIC_MINT_PRICE);

  console.log("web3React", {
    connector,
    web3,
    provider: connector?.getProvider(),
  });

  const { qubicConnect, isAuth } = useAuthContext();

  const [isMinting, setIsMinting] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState<boolean>();
  const [, setIsTxnError] = useState<boolean>();

  const handleQubicNftMint = useCallback(
    (options: { targetNetwork: Network; contractAddress: string }) => {
      if (!web3 || !account) return;
      const { targetNetwork, contractAddress } = options;

      try {
        if (chainId !== targetNetwork) {
          // window.alert(`Network should be chain id: ${targetNetwork}`);
          (web3?.currentProvider as AbstractProvider).sendAsync(
            {
              jsonrpc: "2.0",
              method: "wallet_switchEthereumChain",
              params: [
                {
                  chainId: `0x${targetNetwork.toString(16)}`,
                },
              ],
            },
            (bindOperateEthereumChainError, response) => {
              if (bindOperateEthereumChainError) {
                console.error(bindOperateEthereumChainError);
              } else {
                console.log(response?.result);
              }
            }
          );
          return;
        }
        const MetalionContract = new web3.eth.Contract(
          MetalionABI.abi,
          contractAddress
        );
        setIsMinting(true);
        MetalionContract.methods
          .mint(account)
          .send({ from: account, value: web3.utils.toBN(QUBIC_MINT_PRICE) })
          .on("error", (mintError: Error): void => {
            console.error(mintError);
          })
          .once("transactionHash", (hash: string) => {
            console.log("MINT TXN HASH", hash);

            console.log(hash);
          })
          .once("receipt", (receipt: any) => {
            console.log("MINT RECEIPT", receipt);
            if (receipt.status === true) {
              console.log("MINT SUCCESSFUL");
              setIsMinting(false);
              setIsSuccessful(true);
            } else {
              setIsMinting(false);
              setIsTxnError(true);
            }
          });
      } catch (e) {
        console.error(e);
      }
    },
    [account, chainId, web3]
  );

  const handleMint = useCallback(async () => {
    handleQubicNftMint({
      targetNetwork: isMainnet ? Network.POLYGON : Network.MUMBAI,
      contractAddress,
    });
  }, [contractAddress, handleQubicNftMint]);

  // ------------- end QUBIC

  if (isSuccessful) {
    return (
      <Stack mb="100px" direction={{ base: "column" }}>
        <Heading
          textAlign={{ base: "center", xl: "left" }}
          color="green"
          fontSize={"xl"}
          py="20px"
        >
          成功鑄造！請點擊下方進入兌換中心
        </Heading>
        <Box>
          <NextLink passHref href="/tokens">
            <a>
              <Button
                w={{ base: "full", xl: "auto" }}
                mx="0 auto"
                minW="200px"
                py="30px"
                size="lg"
                borderRadius={"20px"}
                colorScheme={"red"}
                bg="#E6333F"
                color="white"
              >
                兌換中心
              </Button>
            </a>
          </NextLink>
        </Box>
      </Stack>
    );
  }
  return (
    <>
      {isAuth && account && chainId ? (
        <Button
          size="lg"
          isDisabled={!isSaleStarted}
          py="30px"
          borderRadius={"20px"}
          colorScheme={"red"}
          bg="#E6333F"
          color="white"
          isLoading={isMinting}
          onClick={handleMint}
        >
          購買 MGC - {colorType} {`${coffeeType}`}咖啡卡
        </Button>
      ) : (
        <Button
          size="lg"
          py="30px"
          isLoading={isAuthenticating}
          isDisabled={!isSaleStarted}
          borderRadius={"20px"}
          colorScheme={"red"}
          bg="#E6333F"
          color="white"
          onClick={(e) => {
            console.log("clicked");
            qubicConnect?.(e);
            setIsAuthenticating(true);
          }}
        >
          {`申請 / 登入 QubicWallet`}
        </Button>
      )}
    </>
  );
}

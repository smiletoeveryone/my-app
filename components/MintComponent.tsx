import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { ethers } from "ethers";
import MetalionABI from "../contracts/MetalionABI.json";
import { useWeb3Context } from "../context/Web3Context";
import QubicMint from "./QubicMint";
import { chakra, Button, Heading, Stack, Box } from "@chakra-ui/react";
import { useAuthContext } from "../context/AuthContext";

import { isSaleStarted } from "../constants/mintday";

export default function MintComponent({
  trueTotalSupply,
  coffeeType,
  colorType,
  contractAddress,
}: {
  trueTotalSupply: number;
  coffeeType: string;
  colorType: string;
  contractAddress: string;
}) {
  const { address, isWrongNetwork, isConnected, changeNetwork, connect } =
    useAuthContext();
  const { web3Provider } = useWeb3Context();

  // const contractAddress  = "0x32372fb0d0b316a532a6ceb90ea57b9418f354ff";

  const isAmericano = coffeeType === "美式";
  const MINT_PRICE = isAmericano ? "100" : "130";

  const openseaURL = isAmericano
    ? "https://opensea.io/collection/metalion-getting-coffee-red"
    : "https://opensea.io/collection/metalion-getting-coffee-black";

  const contractABI = MetalionABI.abi;

  const [isMinting, setIsMinting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"MATIC" | "CREDIT" | null>(
    null
  );
  const [isSuccessful, setIsSuccessful] = useState<boolean>();
  const [isTxnError, setIsTxnError] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<string>();

  useEffect(() => {
    web3Provider
      ?.getBalance(address as string)
      .then((balance) => setWalletBalance(ethers.utils.formatEther(balance)));
  }, [address, errorMessage, web3Provider]);

  async function handleMint() {
    const signer = web3Provider?.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      if (address) {
        setIsMinting(true);
        const response = await contract.mint(address, {
          value: ethers.utils.parseEther(MINT_PRICE as string),
        });
        console.log("MINT response", response);
        const txnReceipt = await response.wait();
        if (txnReceipt.status === 1) {
          setIsMinting(false);
          setIsSuccessful(true);
        } else {
          setIsMinting(false);
          setIsTxnError(true);
        }

        console.log("MINT TXN", txnReceipt);
      }
    } catch (e) {
      // TODO: Handle not enough balance error
      console.log("Error Caught in Catch Statement: ", e);
      // @ts-ignore
      if (e?.code === 4001) {
        setErrorMessage("交易拒絕、請重新購買");
      }
      if (
        // @ts-ignore
        e?.code === -32603 &&
        // @ts-ignore
        (e?.data?.message.includes("INSUFFICIENT_VALUE") ||
          // @ts-ignore
          e?.data?.message.includes("insufficient"))
      ) {
        setErrorMessage(
          `錢包餘額不足、請充值後再重新購買 (MATIC: ${walletBalance})`
        );
      } // @ts-ignore
      if (e?.code === -32603 && e?.data?.message.includes("NOT_STARTED")) {
        setErrorMessage(`公售尚未開始 請於6/30後回來購買`);
      }
      if (
        // @ts-ignore
        e?.code === -32603 &&
        // @ts-ignore
        e?.data?.message.includes("MAX_SUPPLY_REACHED")
      ) {
        setErrorMessage(`抱歉NFT已售完 請於Opensea上購買`);
      }

      setIsMinting(false);
      setIsTxnError(true);
    }
  }

  if (trueTotalSupply === 0) {
    return (
      <Stack mt="50px" direction={{ base: "column" }}>
        <Heading
          textAlign={{ base: "center", xl: "left" }}
          color="black"
          fontSize={"xl"}
          py="20px"
        >
          抱歉此NFT已全數售完 請至{" "}
          <a href={openseaURL}>
            <span style={{ color: "#006cfa" }}>Opensea</span>
          </a>{" "}
          /{" "}
          <a href="https://lootex.io/stores/metalion?utm_source=https%3A%2F%2Fmetalion.world%2F&utm_medium=referral&utm_campaign=DMP">
            <span style={{ color: "#ec0dcb" }}>LootEx</span>
          </a>{" "}
          購買
        </Heading>
      </Stack>
    );
  }
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

  if (paymentMethod === "MATIC") {
    return (
      <chakra.div mt="50px" mb="100px">
        <Heading
          textAlign={{ base: "center", xl: "left" }}
          color={isMinting ? "green" : "red"}
          fontSize={"xl"}
          py="20px"
        >
          {isMinting ? "請稍候、區塊鏈交易進行中" : errorMessage}
        </Heading>

        <Stack direction={{ base: "column", xl: "row" }}>
          {isConnected ? (
            isWrongNetwork ? (
              <Button
                isDisabled={!isSaleStarted}
                mx="0 auto"
                size="lg"
                colorScheme={"red"}
                bg="#E6333F"
                color="white"
                onClick={changeNetwork}
              >
                更換網路
              </Button>
            ) : (
              <Button
                size="lg"
                isDisabled={!isSaleStarted}
                isLoading={isMinting}
                py="30px"
                borderRadius={"20px"}
                colorScheme={"red"}
                bg="#E6333F"
                color="white"
                onClick={handleMint}
              >
                購買 MGC - {colorType} {`${coffeeType}`}咖啡卡
              </Button>
            )
          ) : (
            <Button
              size="lg"
              isDisabled={!isSaleStarted}
              py="30px"
              borderRadius={"20px"}
              colorScheme={"red"}
              bg="#E6333F"
              color="white"
              onClick={connect}
            >
              連結錢包以 MATIC 購買
            </Button>
          )}
        </Stack>
      </chakra.div>
    );
  }

  if (paymentMethod === "CREDIT") {
    return (
      <chakra.div mt="50px" mb="100px">
        {isTxnError && (
          <Heading
            textAlign={{ base: "center", xl: "left" }}
            color="red"
            fontSize={"xl"}
            py="20px"
          >
            {errorMessage}
          </Heading>
        )}
        <Stack direction={{ base: "column", xl: "row" }}>
          <QubicMint
            contractAddress={contractAddress}
            coffeeType={coffeeType}
            colorType={colorType}
          />
        </Stack>
      </chakra.div>
    );
  }

  // if not CREDIT / MATIC
  return (
    <chakra.div mt="50px" mb="100px">
      {!isSaleStarted && (
        <Heading
          textAlign={{ base: "center", xl: "left" }}
          color="red"
          fontSize={"xl"}
          py="20px"
        >
          公售尚未開始 請於 6/30 返回
        </Heading>
      )}
      <Stack direction={{ base: "column", xl: "row" }}>
        <Button
          isDisabled={!isSaleStarted}
          mx="0 auto"
          size="lg"
          colorScheme={"red"}
          bg="#E6333F"
          py="30px"
          borderRadius={"20px"}
          color="white"
          onClick={() => {
            setPaymentMethod("MATIC");
          }}
        >
          使用 MATIC 購買
        </Button>
        <Button
          isDisabled={!isSaleStarted}
          mx="0 auto"
          size="lg"
          py="30px"
          borderRadius={"20px"}
          colorScheme={"red"}
          bg="#E6333F"
          color="white"
          onClick={() => {
            setPaymentMethod("CREDIT");
          }}
        >
          {`使用信用卡購買 (Qubic Wallet)`}
        </Button>
      </Stack>
    </chakra.div>
  );
}

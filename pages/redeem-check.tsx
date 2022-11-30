import {
  Box,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import PageHero from "../components/PageHero";
import { getPortalsApiURI } from "../constants/api";
import {
  AMERICANO_CONTRACT_ADDRESS,
  LATTE_CONTRACT_ADDRESS,
} from "../constants/contracts";
import Page from "../containers/Page";

const BASE_URI = getPortalsApiURI(process.env.NEXT_PUBLIC_NETWORK_TYPE || "");
class StatusError extends Error {
  status: number | undefined;
  info: any;
}

const DISPLAY_NFT_TYPE = {
  [AMERICANO_CONTRACT_ADDRESS]: "MGC RED - 美式咖啡卡",
  [LATTE_CONTRACT_ADDRESS]: "MGC Black - 拿鐵咖啡卡",
};

export default function RedeemChecker() {
  const [cardType, setCardType] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<string | null>(null);

  const [redeemedStatus, setRedeemedStatus] = useState<string | undefined>(
    undefined
  );

  const [error, setError] = useState<boolean>(false);

  console.log({ cardType, tokenId });
  const handleSubmit = async () => {
    setError(false);
    setRedeemedStatus(undefined);
    try {
      const data = await fetch(
        `${BASE_URI}/token?contract_address=${cardType}&token_id=${tokenId}`
      );

      if (!data.ok) {
        console.log({ data });
        const error = new StatusError(
          "An error occurred while fetching the data."
        );
        // Attach extra info to the error object.
        error.info = await data.json();
        error.status = data.status;
        throw error;
      } else {
        const { redeemed_dessert } = await data.json();

        if (redeemed_dessert === null) {
          setRedeemedStatus("尚未兌換甜點");
        } else {
          setRedeemedStatus(
            `於${new Date(redeemed_dessert).toLocaleDateString()}兌換甜點`
          );
        }
      }
    } catch (e) {
      setError(true);
    }
  };
  return (
    <Page pageRoute="Tokens">
      <PageHero title="甜點兌換查詢" subtitle="輸入您的NFT資料查詢兌換歷史" />
      <Box maxW="3xl" mx="auto" textAlign="center" px={10} pt={50}>
        <Stack spacing={10} direction="column">
          <Stack
            direction={{
              base: "column",
              xl: "row",
            }}
            align="flex-end"
          >
            <FormControl isRequired>
              <FormLabel htmlFor="cardType">NFT種類</FormLabel>
              <Select
                id="cardType"
                placeholder="請選擇"
                bg="white"
                mx="auto"
                variant={"outline"}
                onChange={(e) => {
                  setRedeemedStatus(undefined);
                  setCardType(e.target.value);
                }}
              >
                <option value={AMERICANO_CONTRACT_ADDRESS}>
                  {DISPLAY_NFT_TYPE[AMERICANO_CONTRACT_ADDRESS]}
                </option>
                <option value={LATTE_CONTRACT_ADDRESS}>
                  {DISPLAY_NFT_TYPE[LATTE_CONTRACT_ADDRESS]}
                </option>
              </Select>
            </FormControl>
            <FormControl isRequired mt="20px">
              <FormLabel htmlFor="tokenId">Token ID</FormLabel>
              <NumberInput
                onChange={(value) => {
                  setRedeemedStatus(undefined);
                  if (Number(value) > 206) {
                    setTokenId("206");
                  } else {
                    setTokenId(value);
                  }
                }}
                variant="outline"
                max={206}
                bg="white"
                id="tokenId"
                placeholder="例如: 8"
              >
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <Button
              type="submit"
              w={{ base: "full", xl: "auto" }}
              mx="0 auto"
              onClick={handleSubmit}
              colorScheme={"red"}
              bg="#E6333F"
              color="white"
            >
              查詢
            </Button>
          </Stack>

          {cardType && tokenId && (
            <Text>
              {DISPLAY_NFT_TYPE[cardType]} #{tokenId}
            </Text>
          )}
          {error && <Text>查詢錯誤、請重新試試</Text>}
          {!error && redeemedStatus && (
            <Text fontWeight="bold">{redeemedStatus}</Text>
          )}
        </Stack>
      </Box>
    </Page>
  );
}

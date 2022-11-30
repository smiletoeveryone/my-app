import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import {
  Button,
  SimpleGrid,
  Box,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Page from "../../../containers/Page";
import Card from "../../../components/Card";

export default function Token() {
  const router = useRouter();
  const { tokenId } = router.query;

  const [isRedeemed, setIsRedeemed] = useState(false);

  const cardRef = useRef();

  function getQRCode() {
    return new Promise((resolve) => setTimeout(() => resolve(""), 500)).then(
      () => {
        toggleCardFlip();
        setIsRedeemed(true);
      }
    );
  }

  function toggleCardFlip() {
    if (cardRef) {
      // cardRef?.current?.toggleCardFlip();
    }
  }

  return (
    <Page pageRoute="Token">
      <Box maxW="8xl" mx="auto" px={10} pt={{ base: 8, lg: 50 }}>
        {/* <h1>{tokenId}</h1> */}
        {/* <Heading p="20px" textAlign={"center"}>
          {campaignId} : {tokenId}
        </Heading> */}

        <SimpleGrid columns={{ base: 1 }} spacing={10}>
          <Card ref={cardRef} tokenId={tokenId} />

          <Box height="300px" textAlign="left" mx={"auto"}>
            <Heading>Metalion getting coffee</Heading>
            <Text pb={10}>宙獅計劃的起源，加入我們一起探索宙獅宇宙吧</Text>

            {/* <NextLink href="/campaigns/"> */}
            <Button
              w={{ base: "full", md: "md" }}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={5}
              py={3}
              border="solid transparent"
              fontWeight="bold"
              rounded="md"
              color={useColorModeValue("white", "white")}
              bg={useColorModeValue("brand.600", "brand.500")}
              _hover={{
                bg: useColorModeValue("brand.700", "brand.600"),
              }}
              onClick={getQRCode}
              isDisabled={isRedeemed}
            >
              {!isRedeemed ? "Redeem" : "Enjoy!"}
            </Button>
            {/* </NextLink> */}
          </Box>
        </SimpleGrid>
      </Box>
    </Page>
  );
}

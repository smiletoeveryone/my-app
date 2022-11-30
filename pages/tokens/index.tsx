import React, { useEffect } from "react";
import {
  SimpleGrid,
  Heading,
  Text,
  Skeleton,
  Box,
  Center,
  chakra,
  ChakraProps,
} from "@chakra-ui/react";

import Page from "../../containers/Page";
import PageHero from "../../components/PageHero";

import { useTokens, Token } from "../../hooks/useTokens";
import { useRouter } from "next/router";
import AuthError from "../../components/AuthError";
import { useAuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

const MotionImg = motion<Omit<ChakraProps, "transition">>(chakra.img);

const TokenCard = ({ data }: { data: any }) => (
  <Box>
    {!data.redeemed_at ? (
      <chakra.img
        borderRadius={12}
        width="250px"
        style={{
          margin: "0 auto",
          filter: "grayscale(0)",
        }}
        // TODO: fix ts issue with src
        //@ts-ignore
        src={`${data.image}`}
      />
    ) : (
      <chakra.img
        _hover={{ cursor: "not-allowed" }}
        borderRadius={12}
        width="250px"
        // height="417px"
        style={{
          margin: "0 auto",
          filter: "grayscale(1)",
        }}
        // TODO: fix ts issue with src
        //@ts-ignore
        src={`${data.image}`}
      />
    )}
    <Center fontSize="lg" mt="5">
      {data.name}
    </Center>
  </Box>
);

export default function Tokens() {
  const { tokens, isLoading, isError } = useTokens();
  const { isAuth } = useAuthContext();
  const { push } = useRouter();

  console.log({ tokens, isLoading, isError });

  useEffect(() => {
    if (!isAuth || (!isLoading && isError)) {
      push("/");
    }
  }, [isAuth, isError, isLoading, push]);

  return (
    <Page pageRoute="Tokens">
      <PageHero title="NFT總覽" subtitle="點擊NFT來查看兌換活動" />
      <Box maxW="8xl" mx="auto" textAlign="center" px={10} pt={50}>
        {!isLoading && isError && <AuthError />}
        {!isLoading && !isError && tokens && tokens.length === 0 && (
          <>
            <Heading fontSize="2xl">抱歉您的錢包沒有任何可兌換的 NFT</Heading>
            <Text mt={10}>若有興趣請於以下交易所購買</Text>
            <Box>
              <a
                href="https://lootex.io/stores/metalion"
                rel="noreferrer"
                target={"_blank"}
              >
                <MotionImg
                  mx="auto"
                  mt="30px"
                  w="200px"
                  //@ts-ignore
                  src="/lootex.webp"
                  alt="LootEx - Metalion"
                  display="initial"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileFocus={{
                    scale: 1.05,
                  }}
                  whileInView={{ scale: 1.0 }}
                ></MotionImg>
              </a>
            </Box>
            <Box>
              <a
                href="https://opensea.io/collection/metalion-getting-coffee"
                rel="noreferrer"
                target={"_blank"}
              >
                <MotionImg
                  mt="30px"
                  mx="auto"
                  w="200px"
                  display="initial"
                  //@ts-ignore
                  src="/opensea-logo-dark.svg"
                  alt="Opensea - Metalion"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileFocus={{
                    scale: 1.05,
                  }}
                  whileInView={{ scale: 1.0 }}
                ></MotionImg>
              </a>
            </Box>
          </>
        )}
        {isLoading && (
          <SimpleGrid
            columns={{
              base: 1,
              md: tokens?.length < 2 ? 1 : 2,
              lg: tokens?.length < 2 ? 1 : 3,
            }}
            spacing={10}
          >
            {[1, 2, 3].map((i) => (
              <Box key={i}>
                <Skeleton height="300px" width="300px" mx={"auto"} speed={2} />
              </Box>
            ))}
          </SimpleGrid>
        )}
        {!isError && tokens && (
          <SimpleGrid
            columns={{
              base: 1,
              md: tokens?.length < 2 ? 1 : 2,
              lg: tokens?.length < 2 ? 1 : 3,
            }}
            spacing={10}
          >
            {tokens
              .sort((a: Token, b: Token) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map((token: Token) => (
                <TokenCard
                  key={`${token.name}-${token.token_id}`}
                  data={token}
                />
              ))}
          </SimpleGrid>
        )}
      </Box>
    </Page>
  );
}

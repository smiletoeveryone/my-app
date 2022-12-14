import React from "react";
import {
  Heading,
  HStack,
  chakra,
  Box,
  Flex,
  Button,
  Stack,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import { FaDiscord, FaPhoneAlt } from "react-icons/fa";

const ZH = {
  heroTitle: "Metalion\nä¿±æ¨é¨ ð",
  subtitle:
    "éçéåç Web3 ç¤¾ç¾¤å¹³å°ï¼ä»¥æéçºæ ¸å¿ã\nè³¦è½é£å®¿éè³¼è¡é åï¼æé è¯èªæé Web3 æä½³ç¤¾ç¾¤",
  connectWalletDesc: "gonna åæåå¡\næ´»åå·²æ¼8/5çµæ",
  discordDesc: "è¿½è¹¤ææ°æ´»åæ¶æ¯\nè«å å¥ Metalion Discord ",
  redeemTitle: "é£æ¥é¢åæ¥çæ´»å ð\nå å¥ Discord æ½çæ¶ç¥ ð",
  hero2Title: "å®çåå®å®éå°æ¶\n6/6 æ´»åæ­£å¼éè·",
  cta2Ttile: "å å¥Discord ä¸åçæ­¡ ð",
  checkRedeemBtn: "çé»åææ¥è©¢",
  pleaseSignTitle: "é¢åé£çµæåï¼è«æ¼é¢åé²è¡ç°½ç½²å®æç»å¥",
  loginSuccessfulTitle: "ç»å¥æå",
  // btns
  connectWalletTitle: "é£æ¥é¢å",
  joinDiscordTitle: "å å¥ Discord",
  signWalletTitle: "ç°½ç½²ç¶å®",
  enterPortalTitle: "åå¾åæä¸­å¿",
};

export default function ConnectWallet() {
  const { connect, isAuth } = useAuthContext();

  const i18n = ZH;

  const ConnectionStatus = () => {
    return <Unconnected />;
  };

  const Unconnected = () => (
    <Stack
      direction={["column"]}
      justifyContent={"center"}
      gap={5}
      color="white"
    >
      <Heading
        w="full"
        whiteSpace={{ base: "pre-wrap", sm: "normal" }}
        fontSize={{ base: "5xl", md: "6xl" }}
      >
        {i18n.heroTitle}
      </Heading>
      <chakra.span
        whiteSpace={{ base: "normal", sm: "pre-wrap" }}
        mt={6}
        display="block"
        fontSize={{ base: "lg", sm: "2xl" }}
        fontWeight="extrabold"
        letterSpacing="tight"
        lineHeight="shorter"
        color="white"
        mb={6}
      >
        {i18n.subtitle}
      </chakra.span>

      <Stack
        pt={{ base: "10px", lg: "50px" }}
        direction={{ base: "column", lg: "row" }}
        justifyContent={["left", "center"]}
        gap={{ base: 5, lg: 20 }}
      >
        <VStack
          maxWidth={{ base: "full", lg: "md" }}
          alignItems={{ base: "left", lg: "center" }}
          flex="1"
          spacing={10}
        >
          <Heading
            whiteSpace={{ base: "pre-wrap" }}
            fontSize={{ base: "2xl", lg: "4xl" }}
          >
            {i18n.connectWalletDesc}
          </Heading>
          <Box>
            {isAuth ? (
              <NextLink passHref href="/tokens">
                <Button
                  w="full"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  py={6}
                  border="solid transparent"
                  fontWeight="bold"
                  rounded="lg"
                  color={"white"}
                  bg={"red.600"}
                  _hover={{
                    bg: "red.700",
                  }}
                >
                  {i18n.enterPortalTitle}
                </Button>
              </NextLink>
            ) : (
              <Button
                w={{ base: "full" }}
                leftIcon={<MdOutlineAccountBalanceWallet />}
                alignItems="center"
                justifyContent="center"
                py={6}
                border="solid transparent"
                fontWeight="bold"
                rounded="lg"
                color="white"
                bg={"red.600"}
                _hover={{
                  bg: "red.700",
                }}
                // TODO Check connect type
                onClick={connect as () => Promise<void>}
              >
                {i18n.connectWalletTitle}
              </Button>
            )}

            <NextLink passHref href="/redeem-check">
              <Button
                mt={5}
                w={{ base: "full" }}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                py={6}
                border="solid transparent"
                fontWeight="bold"
                rounded="lg"
                color={"gray.600"}
                bg={"white"}
                colorScheme="gray"
              >
                {i18n.checkRedeemBtn}
              </Button>
            </NextLink>
          </Box>
        </VStack>
        <VStack
          maxWidth={{ base: "full", lg: "md" }}
          alignItems={{ base: "left", lg: "center" }}
          flex="1"
          spacing={10}
        >
          <Heading
            whiteSpace={{ base: "pre-wrap" }}
            fontSize={{ base: "2xl", lg: "4xl" }}
          >
            {i18n.discordDesc}
          </Heading>
          <Button
            leftIcon={<FaDiscord />}
            w="full"
            as={"a"}
            target="_blank"
            href="https://discord.gg/metalion"
            rel="noreferrer"
            alignItems="center"
            justifyContent="center"
            py={6}
            border="solid transparent"
            fontWeight="bold"
            rounded="lg"
            color="white"
            bg="purple.600"
            _hover={{
              bg: "purple.700",
            }}
          >
            {i18n.joinDiscordTitle}
          </Button>
        </VStack>
      </Stack>
      <Box>
        <HStack mx="auto" mt="40px" justify={{ base: "left", sm: "center" }}>
          <FaPhoneAlt size="20px" />
          <Heading size="lg" display="inline-block">
            å®¢æå°ç·: 02-87939698
          </Heading>
        </HStack>
      </Box>
    </Stack>
  );

  return (
    <Flex
      p={{ base: "30px", md: 50 }}
      minH={"xl"}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full">
        <Box
          px={4}
          py={20}
          maxWidth="4xl"
          textAlign={{ base: "left", md: "center" }}
        >
          <ConnectionStatus />
        </Box>
      </Flex>
    </Flex>
  );
}

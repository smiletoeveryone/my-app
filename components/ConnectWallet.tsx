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
  heroTitle: "Metalion\n俱樂部 🎉",
  subtitle:
    "雄獅集團的 Web3 社群平台，以旅遊為核心。\n賦能食宿遊購行領域，打造華語旅遊 Web3 最佳社群",
  connectWalletDesc: "gonna 兌換咖啡\n活動已於8/5結束",
  discordDesc: "追蹤最新活動消息\n請加入 Metalion Discord ",
  redeemTitle: "連接錢包查看活動 🎉\n加入 Discord 抽獎慶祝 🎁",
  hero2Title: "宙獅元宇宙開台慶\n6/6 活動正式開跑",
  cta2Ttile: "加入Discord 一同狂歡 🎉",
  checkRedeemBtn: "甜點兌換查詢",
  pleaseSignTitle: "錢包連結成功，請於錢包進行簽署完成登入",
  loginSuccessfulTitle: "登入成功",
  // btns
  connectWalletTitle: "連接錢包",
  joinDiscordTitle: "加入 Discord",
  signWalletTitle: "簽署綁定",
  enterPortalTitle: "前往兌換中心",
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
            客服專線: 02-87939698
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

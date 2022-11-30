import { Box, Text, Heading, VStack, Container, Stack } from "@chakra-ui/react";
import React from "react";
import Countdown from "react-countdown";
import XinMediaLogo from "../XinMediaLogo";

export default function Hero() {
  const mintCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      // TODO: getMint
      <></>;
      return;
    } else {
      return (
        <Box
          w={{ base: "300px", lg: "400px" }}
          borderRadius="20px"
          border="3px solid #B49060"
          my="20px"
          py="30px"
          background="rgba(255,255,255,0.8)"
          position="relative"
          _before={{
            content: "'倒數'",
            background: "white",
            fontSize: "2xl",
            mx: "auto",
            px: "20px",
            position: "absolute",
            top: "-20px",
            left: 0,
            right: 0,
            width: "90px",
            fontWeight: "bold",
          }}
        >
          <Heading textAlign="center" fontSize="2xl" position={"relative"}>
            {days}天 {hours}時 {minutes}分 {seconds}秒
          </Heading>
        </Box>
      );
    }
  };
  return (
    <Box
      position="relative"
      color="#1E5B55"
      fontSize="2xl"
      overflow={"hidden"}
      zIndex={1}
    >
      <Box
        zIndex={-1}
        position="absolute"
        bottom={{ base: "-150px", md: "-150px" }}
        width="full"
        height="500px"
        bgImage="url('/esg/xin_bg.png')"
        bgRepeat={"no-repeat"}
        mixBlendMode="multiply"
        bgPosition="bottom"
      ></Box>
      <Container py="160px">
        <VStack>
          <Stack
            direction={{ base: "column", md: "row" }}
            textAlign="center"
            alignItems={"center"}
            spacing={{ base: 5, md: 10 }}
          >
            <XinMediaLogo width={{ base: "200px", md: "200px" }} />
            <Heading fontFamily={"sans-serif"} fontWeight="normal" color="gray">
              {" "}
              X{" "}
            </Heading>
            <Heading
              // fontFamily={"Zapfino"}
              fontSize={{ base: "3xl", md: "4xl" }}
            >
              ESG NFT
            </Heading>
          </Stack>
          <Text pt="30px" fontWeight={"bold"} textAlign="center" maxW={"600px"}>
            「致為 ESG 共同努力的你，一份小小的驚喜 : ESG NFT 即將於 7/18 空投」
          </Text>
          <Box pt="40px">
            <Countdown date={"2022-07-19T06:59:00Z"} renderer={mintCountdown} />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

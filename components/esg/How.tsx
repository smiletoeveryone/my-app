import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function How() {
  return (
    <Box
      bg="#F8F3DC"
      position="relative"
      fontSize={{ base: "xl", md: "2xl" }}
      pb={"300px"}
      overflow="hidden"
    >
      <Box
        position="absolute"
        bottom={"-150px"}
        width="full"
        height="500px"
        bgImage="url('/esg/xin_bg.png')"
        bgRepeat={"no-repeat"}
        mixBlendMode="multiply"
        bgPosition="bottom"
      ></Box>
      <Container textAlign={"center"}>
        <Heading pt="60px">如何取得ESG NFT?</Heading>

        <Text mt="60px" textAlign={"justify"} px={4}>
          採取所有實體購票的與會者都可以獲得一枚免費空投NFT。現場我們會拍照背板區後的空桌設立一處
          Qubic
          Wallet教學開設站以及NFT空投綁定站，作為新手教學與問題解除的服務。參加者只要藉由QR掃碼進入網站。提供自有的虛擬錢包或是剛剛開設的Qubic
          Wallet綁定做為空投之依據。即可在立刻獲得其中一款ESG設計款NFT。線上參加的的與會者也有機會獲得限量的空投NFT。QR
          code也會提供在直播影片尾聲，供線上使用者與Discord社群OG申請空投。
        </Text>
      </Container>
    </Box>
  );
}

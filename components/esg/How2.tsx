import { Box, Container, Heading, Text, Stack, Button } from "@chakra-ui/react";
import React from "react";

export default function How() {
  return (
    <Box
      bg="#F8F3DC"
      position="relative"
      fontSize={{ base: "xl", md: "2xl" }}
      pb={"200px"}
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
        <Heading color="#ECA053" pt="60px">
          ESG論壇 接軌國際 永續美好生活
        </Heading>
        <Heading color="#ECA053" pt="60px">
          企業永續×觀光永續×接軌國際：共創美好生活
        </Heading>

        <Text mt="60px" textAlign={"justify"} px={4}>
          「永續」是當前全球最關注的議題。2004年聯合國提出「ESG」（環境Environmental、社會Social、公司治理Governance）三大指標，
          2015年聯合國年宣布「2030永續發展目標」，台灣也陸續公布「2050淨零排放」相關政策。「永續」不僅是企業加分項，更是必備競爭力，就連向來被視為「無煙囪」工業的觀光產業，也開始在食宿遊購行等多面向響應！欣傳媒即將舉辦的「接軌國際永續美好生活」論壇，邀請您共同探討產業如何升級轉型，接軌國際，一窺永續商機帶來的美好新世界。
        </Text>

        <Stack direction={{ base: "column", xl: "row" }} mt="50px">
          <Box flex={1}>
            <a
              href="https://event.xinmedia.com/forum/2022ESG/NFT.html"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                w="full"
                bg="#ECA053"
                color="white"
                maxWidth={{ base: "full", xl: "300px" }}
                mx="auto"
                borderRadius="10px"
                _hover={{
                  bg: "orange.500",
                }}
              >
                ESG NFT 首頁
              </Button>
            </a>
          </Box>
          <Box flex={1}>
            <a
              href="https://event.xinmedia.com/forum/2022ESG/"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                w="full"
                bg="#ECA053"
                color="white"
                maxWidth={{ base: "full", xl: "300px" }}
                mx="auto"
                borderRadius="10px"
                _hover={{
                  bg: "orange.500",
                }}
              >
                ESG 論壇網
              </Button>{" "}
            </a>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

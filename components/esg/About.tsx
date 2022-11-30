import { Box, Container, Heading, Text, chakra } from "@chakra-ui/react";
import React from "react";

export default function About() {
  return (
    <Box
      bg="#419C93"
      color="white"
      fontSize={{ base: "xl", md: "2xl" }}
      px={4}
      pb={20}
    >
      <Container textAlign={"center"}>
        <Heading color="#ECA053" pt="60px">
          ESG NFT的賦能
        </Heading>

        <Text mt="60px" textAlign={"justify"}>
          提高產業價值鏈的運作效能，對公益的認同可以驅動區塊鏈的使用更有效能，那意味著更低的成本和更高的價值。
          未來以農產品履歷管理如果和區塊鏈科技結合，除了可以讓資訊系統更安全的運作，也能讓更多人投入數位世界擔任食安志工的行列，共同為人類食品安全把關，甚至從網路世界出發走進馬路世界，發展成全球性的社會創新運動。
          <br />
          <br />
          開放水耕蔬菜相關兌換，讓NFT持有者能認識水耕蔬菜。水耕蔬菜有別於傳統種植方法，不需要用泥土種植，避免植物攝取泥土中的重金屬，使用進口的礦物營養成分，灌溉用水經過多重UV消毒，在完全可控環境下種植，產量和質量得到保證，以遠離工業污染的惠東及雲南作為種植基地，當地環境得天獨厚、日照充足，讓農作物能夠利用天然陽光作光合作用，有別於使用LED燈照射農作物而浪費大量能源，大大減少碳排放，種植不忘兼顧ESG理念。消費者不用擔心污染及基因改造問題。每棵蔬菜由播種、收成、加工至市場推廣，每個步驟均由專業團隊嚴密監控，當未來這項工程技術擴大規模，所有的綠色電能資源都能直接回饋給電網；只有發電過程的剩餘熱能，才會被應用於農作灌溉。
        </Text>

        <Heading
          fontSize={"3xl"}
          bg="#ECA053"
          color="white"
          maxWidth="180px"
          py="5px"
          mx="auto"
          my="40px"
          borderRadius="10px"
        >
          賦能項目
        </Heading>

        <Text>
          線上得到的限量空投NFT持有者可至任一Gonna 分店用QR
          code兌換一份ESG主題新鮮沙拉。
        </Text>

        <chakra.img
          my="30px"
          mx="auto"
          src="/esg/eatcleangogreen.png"
        ></chakra.img>
        <Text>
          未來的發行白名單資格
          在未來的其他大型項目中，對於此ESG項目NFT的支持者與持有者會有為來其他項目發行時的優先認購的白名單資格。詳細內容也會在未來發行前提供。
        </Text>
      </Container>
    </Box>
  );
}

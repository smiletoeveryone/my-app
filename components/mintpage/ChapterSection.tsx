import React from "react";
import { Text, Image, Flex, Box, Heading } from "@chakra-ui/react";

export default function ChapterSection() {
  return (
    <Flex
      // maxH="100vh"
      overflowY="hidden"
      color="white"
      direction={{ base: "column", xl: "row-reverse" }}
      // width={{ base: "full", lg: "100%" }}
      minH={{ base: "4xl", xl: "100vh" }}
      // justifyContent="space-between"
      justify="center"
      alignItems="center"
      bg="#30b3c0"
    >
      <Box
        mx="auto"
        // px={{ base: 15 }}
        // pt="20%"
        flex="50%"
        // maxW={"800px"}

        minH={{ base: "2xl", xl: "100vh" }}
        position="relative"
      >
        <Flex
          justify="center"
          alignItems="center"
          direction={{ base: "column", xl: "row" }}
        >
          <Box maxWidth="4xl" mt="20%" px={{ base: 8, xl: 20 }}>
            <Heading textAlign="center">第一章</Heading>
            <Heading textAlign="center" fontSize="8xl">
              『食』
            </Heading>

            {/* <Text
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "2xl", lg: "3xl" }}
            >
              以風靡歐美的 Fast Slow Food 精神， 提供健康美味的快速慢食！
              精選季節良食、多色蔬果、超級食物與最好的肉類，在開放式廚房看得見手工自製的料理過程，提供明亮寬敞的座位與自由自在的舒適用餐空間，在一餐中就能均衡攝取營養，每天都能享用好肉好菜！
            </Text> */}
            <Text
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "2xl", lg: "3xl" }}
              py="100px"
            >
              『食』是踏入宙獅計劃 (食/宿/遊/購/行) 五大領域的第一章，為迎接Web
              3.0世代來臨，雄獅集團宣布以宙獅計劃（Metalion）為名正式進軍元宇宙，積極搶進新世代旅遊社群市場。首波將由雄獅集團旗下之餐飲事業體欣食旅品牌「gonna
              共樂遊」打頭陣，探索利用 NFT
              造福會員們獨特的優惠，並享有未來宙獅計劃的優先參與權。
            </Text>

            <Image src="/metalionxgonna.svg" alt="" mx="auto" my="50px"></Image>
          </Box>
        </Flex>
      </Box>
      <Box
        flex="50%"
        alignSelf="flex-start"
        minH={{ base: "2xl", xl: "100vh" }}
        // h={"100vh"}
        w={{ base: "full" }}
        // minH={"50vh"}
        // w={{ base: "full" }}
        // h={{ base: "full" }}
        // maxW={"800px"}
        position="relative"

        // backgroundRepeat="no-repeat"
      >
        <Box
          top="0"
          width="100%"
          height="100%"
          position="absolute"
          alignItems="stretch"
          alignSelf={"flex-start"}
          background="url(/blue_gonna_food.jpg)"
          backgroundSize="contain"
          backgroundRepeat={"no-repeat"}
          // backgroundAttachment={"fixed"}
          backgroundPosition="center"
        />
      </Box>
    </Flex>
  );
  // );
  //     <Section bg="#30b3c0">
  //       <Heading textAlign="center">第一章</Heading>
  //       <Heading textAlign="center" fontSize="8xl">
  //         食
  //       </Heading>
  //       <Box>
  //         <Image src="/blue_gonna_food.jpg" />
  //       </Box>
  //     </Section>
  //   );
}

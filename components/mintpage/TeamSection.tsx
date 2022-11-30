import { Text, Flex, Box, Heading, SimpleGrid, chakra } from "@chakra-ui/react";
import React from "react";

export default function TeamSection() {
  return (
    <Flex
      // maxH="100vh"
      overflowY="hidden"
      direction={{ base: "column-reverse", xl: "row" }}
      // width={{ base: "full", lg: "100%" }}
      minH={{ base: "4xl", xl: "100vh" }}
      // justifyContent="space-between"
      justify="center"
      alignItems="center"
      bg="#eee"
    >
      <Box
        flex="50%"
        alignSelf="flex-start"
        minH={{ base: "2xl", xl: "100vh" }}
        // h={"100vh"}
        w={{ base: "full" }}
        position="relative"
      >
        <Box
          top="0"
          width="100%"
          minHeight="100vh"
          height="120%"
          position="absolute"
          // alignItems="stretch"
          alignSelf={"flex-start"}
          background="url(/002.jpg)"
          backgroundSize="cover"
          backgroundRepeat={"no-repeat"}
          bgPos="top"
          // backgroundAttachment={"fixed"}
          backgroundPosition="top"
        />
      </Box>
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
          bg="#111"
        >
          <Box
            maxWidth={{ base: "full", xl: "4xl" }}
            mt="20%"
            px={{ base: 8, xl: 20 }}
            pb="130px"
            color="white"
          >
            <Heading
              color="white"
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}
              mb={5}
            >
              gonna NFT 發行團隊
            </Heading>
            <Text
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "2xl", lg: "3xl" }}
            >
              由宙獅計畫團隊與gonna品牌聯手策劃，並與 Web3 專業顧問團隊合作發行
            </Text>
            <SimpleGrid columns={[2, 2, 2]} spacing={20} my="100px" mx="auto">
              <Box textAlign={"center"} padding={5}>
                <chakra.img src="liontravel-logo-white.png" />
                {/* <Text fontSize="2xl" fontWeight={"bold"}>
                  Good People Consulting
                </Text> */}
                {/* <Text>相關事項</Text> */}
              </Box>
              <Box textAlign={"center"} padding={5}>
                <chakra.img src="white_at_gonna_logo.png" />
                {/* <Text fontSize="2xl" fontWeight={"bold"}>
                  Good People Consulting
                </Text> */}
              </Box>
              <Box textAlign={"center"} padding={5}>
                <chakra.img src="gp-logo.png" />
              </Box>
              <Box textAlign={"center"} padding={5}>
                <chakra.img src="mithras-white-logo.png" />
              </Box>
            </SimpleGrid>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

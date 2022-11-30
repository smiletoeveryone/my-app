import { Text, Box, Flex, Heading, chakra } from "@chakra-ui/react";
import React from "react";
import NFTGallery from "./NFTGallery";

export default function MintSection() {
  return (
    <Box
      py={{ base: "100px", xl: "200px" }}
      // name="mint"
      position="relative"
      overflow="hidden"
      bg="#419C93"
      color="black"
    >
      {/* Circle */}
      <Box
        position="absolute"
        zIndex={0}
        top="0"
        left={{ base: "0", xl: "900px" }}
        width="100%"
        height="100%"
        backgroundColor="#1e5b54"
        transform="translateZ(0) translate3d(0, 0, 0)"
        clipPath={{
          base: "circle(300px at center bottom)",
          sm: "circle(320px at center bottom)",
          md: "circle(400px at center bottom)",
          xl: "circle(500px at center center)",
        }}
      ></Box>
      {/* Content */}

      <Flex direction="column">
        <Flex
          id="content"
          justify={"center"}
          justifyContent={"space-between"}
          maxW={"8xl"}
          // pt={{ base: "0", xl: "200px" }}
          w="100%"
          mx="auto"
          alignItems="center"
          // gap={isLatte ? 20 : 0}
          direction={{ base: "column", xl: "row" }}
        >
          {/* Rightside Content */}
          <Box
            maxW={"800px"}
            // pb={{ base: isAmericano ? "auto" : "100px" }}
            px={2}
            position="relative"
            alignSelf={{ base: "center", xl: "flex-start" }}
          >
            <Heading
              color="#ECA053"
              mt={3}
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "5xl", sm: "6xl", lg: "7xl" }}
            >
              ESG NFT
            </Heading>

            <Text
              maxW="620px"
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "2xl", lg: "3xl" }}
              color="white"
              px={2}
            >
              <chakra.br display={{ base: "none", xs: "block" }} />
              NFT 持有者
              <br />
              <br />
              獲得宙獅俱樂部會員資格可至Metalion Discord
              登入驗證為持有者身份享有持有者權益
            </Text>

            <NFTGallery coffee="americano" />

            <Text
              mt={10}
              maxW="620px"
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "2xl", lg: "3xl" }}
              color="white"
            >
              限持有欣傳媒 ESG 論壇實體票券者於論壇當天現場登記獲得. 僅此一版
            </Text>

            <Box
              bg="#1e5b54"
              maxW="300px"
              p={2}
              borderRadius="20px"
              mt="30px"
              mx={{ base: "auto", xl: "0" }}
            >
              <chakra.img mx="auto" src={"esg/eatcleangogreen.png"} />
            </Box>
          </Box>
          {/* Leftside: Coffee Image */}
          <Flex
            justifyContent={{ base: "center", xl: "flex-end" }}
            alignItems="center"
            minW={{ base: "full", xl: "600px" }}
            mb={{ base: 0, md: "150px" }}
          >
            <chakra.img
              borderRadius={"20px"}
              alignSelf={"flex-end"}
              zIndex={2}
              marginTop={{
                base: "20px",
                xl: "0",
              }}
              display={{ base: "none", xl: "block" }}
              // This casues animation but shifts screen
              // TODO: get gonna's opinion
              width={{
                base: "400px",
                md: "500px",
                lg: "500px",
                xl: "500px",
              }}
              // width={{
              //   base: isAmericano ? "200px" : "350px",
              //   md: isAmericano ? "300px" : "500px",
              //   lg: isAmericano ? "350px" : "600px",
              //   xl: isAmericano ? "500px" : "600px",
              // }}
              // paddingLeft={{ xl: isAmericano ? "100px" : "0" }}
              // TODO: get gonna's opinion
              // pt={{ base: isLatte ? "50px" : "0" }}
              // pt={{ base: isLatte ? "50px" : "0" }}
              // TODO: get gonna's opinion
              src={"nfts/esg/01.jpg"}
              // src={isAmericano ? "/americano2.png" : "/latte.png"}
              alt="americano"
              // This casues animation but shifts screen
              // transition="1s"
              willChange={"transform"}
              _hover={{
                willChange: "transform",
                // transform: isAmericano
                //   ? "translateZ(0) translate3d(0, 0, 0) translateY(-40px) rotate(-10deg)"
                //   : "translateZ(0) translate3d(0, 0, 0) translateY(-40px)",
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

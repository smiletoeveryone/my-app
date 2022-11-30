import { Box, Flex, Heading, Spacer as ChakraSpace } from "@chakra-ui/react";
import React from "react";

export default function Spacer() {
  return (
    <Box
      bg="#F8F3DC"
      position="relative"
      fontSize={{ base: "xl", md: "2xl" }}
      py={{ base: "80px", md: "120px" }}
      overflow="hidden"
    >
      <Flex
        maxW="1000px"
        mx="auto"
        direction={{ base: "column", xl: "row" }}
        gap={5}
      >
        <Box textAlign={"center"}>
          <Heading color="orange.400">環境</Heading>
          <Heading
            color="orange.400"
            fontSize={{ base: "5xl", md: "5xl" }}
            position="relative"
            // _after={{
            //   position: "absolute",
            //   content: "'環境'",
            //   writingMode: "vertical-rl",
            //   height: "200px",
            //   // textOrientation: "upright",
            //   left: "30px",
            //   bottom: "-30px",
            //   fontSize: { base: "5xl", md: "8xl" },
            //   color: "orange.500",
            // }}
            // _before={{
            //   position: "absolute",
            //   content: "''",
            //   writingMode: "vertical-rl",
            //   height: "200px",
            //   // textOrientation: "upright",
            //   left: "150px",
            //   bottom: "-110px",
            //   fontSize: { base: "5xl", md: "8xl" },
            //   color: "orange.500",
            // }}
          >
            Environmental
          </Heading>
        </Box>
        <ChakraSpace />
        <Box textAlign={"center"}>
          <Heading color="orange.600">社會</Heading>
          <Heading
            color="orange.600"
            fontSize={{ base: "5xl", md: "5xl" }}
            position="relative"
            // _after={{
            //   position: "absolute",
            //   writingMode: "vertical-rl",
            //   height: "200px",
            //   content: "'社會'",
            //   right: "100px",
            //   bottom: "-30px",
            //   fontSize: { base: "5xl", md: "8xl" },
            //   color: "orange.700",
            // }}
          >
            Social
          </Heading>
        </Box>
        <ChakraSpace />
        <Box textAlign={"center"}>
          <Heading color="orange.800">治理</Heading>
          <Heading
            color="orange.800"
            fontSize={{ base: "5xl", md: "5xl" }}
            position="relative"
            // _after={{
            //   position: "absolute",
            //   writingMode: "vertical-rl",
            //   height: "300px",
            //   content: "'治理'",
            //   left: "30px",
            //   bottom: "-80px",
            //   fontSize: { base: "5xl", md: "8xl" },
            //   color: "orange.900",
            // }}
            // _before={{
            //   position: "absolute",
            //   writingMode: "vertical-rl",
            //   height: "300px",
            //   content: "''",
            //   left: "150px",
            //   bottom: "-160px",
            //   fontSize: { base: "5xl", md: "8xl" },
            //   color: "orange.700",
            // }}
          >
            Governance
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
}

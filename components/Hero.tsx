import React from "react";
import { chakra, Box, Flex, Stack } from "@chakra-ui/react";
import ConnectWallet from "./ConnectWallet";

const HomeHero = () => {
  return (
    <chakra.header>
      <Box w="full" minH="100vh" position="relative" background="#E6333F">
        <Flex
          minH="100vh"
          align="center"
          pos="relative"
          justify="center"
          boxSize="full"
        >
          <Stack textAlign="center" alignItems="center" spacing={6}>
            <ConnectWallet />
          </Stack>
        </Flex>
      </Box>
    </chakra.header>
  );
};

export default HomeHero;

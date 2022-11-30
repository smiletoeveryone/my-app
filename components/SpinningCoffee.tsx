import { Box, keyframes } from "@chakra-ui/react";
import React from "react";

const spin = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

export default function SpinningCoffee() {
  const spinAnimation = `${spin} 100s linear infinite`;

  return (
    <Box id="coffee" maxWidth="500px" maxH="500px" mx="auto">
      <Box
        mx="auto"
        bg={"url(/gonna-coffeecup2.png)"}
        backgroundRepeat="no-repeat"
        width={{ base: "300px", md: "500px" }}
        height={{ base: "300px", md: "500px" }}
        bgSize="contain"
        animation={spinAnimation}
      ></Box>
    </Box>
  );
}

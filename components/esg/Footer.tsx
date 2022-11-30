import { Box, chakra, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <Box bg="#1E5B55" p="36px">
      <Container textAlign={"center"} color="white">
        <Flex mx="auto" direction={"column"} gap={"20px"}>
          <chakra.img
            src="/esg/xin_logo_white.svg"
            width="165px"
            alt=""
            mx="auto"
          />
          <Text>台灣台北市114內湖區石潭路151號</Text>
          <Text>Copyright © 2022 Xinmedia All rights reserved </Text>
        </Flex>
      </Container>
    </Box>
  );
}

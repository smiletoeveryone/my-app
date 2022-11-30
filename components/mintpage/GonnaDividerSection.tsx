import { Box } from "@chakra-ui/react";
import React from "react";
import Section from "../../containers/Section";

export default function GonnaDividerSection() {
  return (
    <Section
      name="gonnaIntro"
      bg="#D2D3D5"
      // minHeight={"auto"}
      // py="100px"
      backgroundImage="url(/001.jpg)"
      backgroundSize={{ base: "contain", xl: "contain" }}
      bgRepeat={"no-repeat"}
      bgPos={{ base: "88%", xl: "center" }}
      backgroundAttachment={{ base: "", xl: "fixed" }}
    >
      <Box
        zIndex={0}
        w="full"
        maxW="8xl"
        // top="50%"
        // left="50%"
        // transform={"translate(-50%,-50%)"}
      >
        {/* <chakra.img src="/001.jpg" width="7xl" mx="auto" /> */}
      </Box>
    </Section>
  );
}

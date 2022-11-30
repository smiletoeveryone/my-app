import { Flex, Box, ChakraProps } from "@chakra-ui/react";
import React from "react";

interface SectionProps {
  children?: React.ReactNode;
  name?: string;
  bg?: string;
  props?: ChakraProps;
}

export default function Section({
  children,
  name,
  bg,
  ...props
}: SectionProps & ChakraProps) {
  return (
    <Box key={name} id={name}>
      <Flex
        bg={bg || "white"}
        width={{ base: "full", lg: "100%" }}
        minH={{ base: "4xl", xl: "100vh" }}
        p={5}
        justifyContent="space-between"
        alignItems={"top"}
        position="relative"
        {...props}
      >
        <Box mx="auto" height="full">
          {children}
        </Box>
      </Flex>
    </Box>
  );
}

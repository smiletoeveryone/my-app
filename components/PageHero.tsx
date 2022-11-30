import React from "react";
import { chakra, Box, Flex, Heading, Stack } from "@chakra-ui/react";

type PageHeroProps = {
  title: string;
  subtitle: string;
};

const PageHero = (props: PageHeroProps) => {
  const { title, subtitle } = props;

  return (
    <chakra.header>
      <Box
        w="full"
        h={{ base: "260px", md: "260px" }}
        position="relative"
        bg="#E6333F"
        color="white"
        bgPos="center"
        bgSize="cover"
      >
        <Flex align="center" pos="relative" justify="center" boxSize="full">
          <Stack textAlign="center" alignItems="center">
            <Flex p={50} w="full" alignItems="center" justifyContent="center">
              <Flex justify="center" w="full">
                <Box px={4} py={20} textAlign={"center"}>
                  <Heading>{title}</Heading>
                  <chakra.h3 color="gray.300" pt={2}>
                    {subtitle}
                  </chakra.h3>
                </Box>
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Box>
    </chakra.header>
  );
};

export default PageHero;

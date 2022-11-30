import React from "react";
import { SimpleGrid, Box, Center, Heading } from "@chakra-ui/react";

import NextLink from "next/link";
import { useRouter } from "next/router";

import Page from "../../containers/Page";

const EN = {
  campaignsTitle: "Campaigns",
  campaignName: "Campaign",
};

const ZH = {
  campaignsTitle: "最新活動",
  campaignName: "活動",
};

export default function Campaigns() {
  // locale
  const { locale } = useRouter();
  console.log({ locale });
  const isEn = locale === "en-US";
  const i18n = isEn ? EN : ZH;

  return (
    <Page pageRoute="Campaigns">
      <Box
        maxW="8xl"
        mx="auto"
        textAlign="center"
        px={10}
        pt={{ base: "60px" }}
      >
        <Heading p="20px">{i18n.campaignsTitle}</Heading>
        {/* <Flex w="full" alignItems="center"> */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <NextLink passHref href="/campaigns/Campaign1">
            <a>
              <Box bg="brand.400" height="300px">
                <Center h="300px">{i18n.campaignName}1</Center>
              </Box>
            </a>
          </NextLink>
          <NextLink passHref href="/campaigns/Campaign2">
            <a>
              <Box bg="brand.400" height="300px">
                <Center h="300px">{i18n.campaignName}2</Center>
              </Box>
            </a>
          </NextLink>
          <NextLink passHref href="/campaigns/Campaign3">
            <a>
              <Box bg="brand.400" height="300px">
                <Center h="300px">{i18n.campaignName}3</Center>
              </Box>
            </a>
          </NextLink>
          <NextLink passHref href="/campaigns/Campaign4">
            <a>
              <Box bg="brand.400" height="300px">
                <Center h="300px">{i18n.campaignName}4</Center>
              </Box>
            </a>
          </NextLink>
          <NextLink passHref href="/campaigns/Campaign5">
            <a>
              <Box bg="brand.400" height="300px">
                <Center h="300px">{i18n.campaignName}5</Center>
              </Box>
            </a>
          </NextLink>
          <NextLink passHref href="/campaigns/Campaign6">
            <a>
              <Box bg="brand.400" height="300px">
                <Center h="300px">{i18n.campaignName}6</Center>
              </Box>
            </a>
          </NextLink>
        </SimpleGrid>
      </Box>
    </Page>
  );
}

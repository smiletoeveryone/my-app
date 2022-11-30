import React from "react";
import { SimpleGrid, Box, Center, Heading } from "@chakra-ui/react";

import NextLink from "next/link";
import { useRouter } from "next/router";

import Page from "../../../containers/Page";
import Image from "next/image";

const tokens = ["token1", "token2", "token3", "token4", "token5"];

// const EN = {
//   campaignsTitle: "Campaigns",
//   campaignName: "Campaign",
// };

// const ZH = {
//   campaignsTitle: "最新活動",
//   campaignName: "活動",
// };

export default function Campaign() {
  const { query } = useRouter();
  const { campaignId } = query;
  // locale
  // const isEn = locale === "en-US";
  // const i18n = ZH;

  const TokenCard = ({ tokenId }: { tokenId: string }) => (
    <NextLink passHref href={`/campaigns/${campaignId}/${tokenId}`}>
      <a>
        <Box>
          <Image
            width="300px"
            style={{ margin: "0 auto" }}
            src="/nft-image.png"
          />
          <Center>{tokenId}</Center>
        </Box>
      </a>
    </NextLink>
  );

  return (
    <Page pageRoute="Campaign">
      <Box
        maxW="8xl"
        mx="auto"
        textAlign="center"
        px={10}
        pt={{ base: 0, lg: 50 }}
      >
        <Heading p="20px">CampaignId: {campaignId}</Heading>
        {/* <Flex w="full" alignItems="center"> */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {tokens.map((token) => (
            <TokenCard key={token} tokenId={token} />
          ))}
        </SimpleGrid>
      </Box>
    </Page>
  );
}

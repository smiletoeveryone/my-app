import { Container } from "@chakra-ui/react";
import React from "react";
import TestnetMintComponent from "../components/TestnetMintComponent";
import Page from "../containers/Page";

export default function minttest() {
  return (
    <Page>
      <Container p={20} w="full" alignItems="center" justifyContent="center">
        <TestnetMintComponent />
      </Container>
    </Page>
  );
}

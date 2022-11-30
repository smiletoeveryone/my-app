import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/esg/Footer";

const Page = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <Navbar />
      <Box fontFamily="Helvetica">{children}</Box>
      <Footer />
    </Box>
  );
};
export default Page;

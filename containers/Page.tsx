import React from "react";
import {
  chakra,
  Box,
  AlertIcon,
  Alert,
  AlertDescription,
  LightMode,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWeb3Context } from "../context/Web3Context";
import { isMainnet } from "../constants/mintday";
interface PageProps {
  children?: React.ReactNode;
  pageRoute?: string;
}

const Page = ({ children, pageRoute }: PageProps) => {
  const { network } = useWeb3Context();
  const isWrongNetwork = isMainnet
    ? network && network.name !== "matic"
    : network && network.name !== "maticmum";
  const rightNetworkText = isMainnet
    ? `Polygon Mainnet - Matic`
    : `Polygon Testnet - Mumbai`;

  return (
    <Box minH={"100vh"} position="relative" background="#eee">
      {isWrongNetwork && (
        <LightMode>
          <Alert
            variant="top-accent"
            status="warning"
            colorScheme="purple"
            margin={"0 auto"}
            color="black"
          >
            <AlertIcon />

            <AlertDescription
              fontSize="sm"
              textAlign={"center"}
              margin={"0 auto"}
            >
              <chakra.span fontWeight="semibold">
                注意：你目前在不對的區塊鏈網絡！
              </chakra.span>
              {`請於錢包轉換區塊鏈網絡到 ${rightNetworkText} 並重新登入`}
            </AlertDescription>
          </Alert>
        </LightMode>
      )}
      <Navbar />

      <chakra.div
        pb={
          pageRoute === "Home" || pageRoute === "NewHome"
            ? { base: "240px", sm: "0px" }
            : { base: "300px", md: "140px" }
        }
      >
        {children}
      </chakra.div>
      <Footer />
    </Box>
  );
};
export default Page;

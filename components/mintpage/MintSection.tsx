import {
  Text,
  Box,
  Flex,
  Heading,
  chakra,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-scroll";
import {
  AMERICANO_CONTRACT_ADDRESS,
  LATTE_CONTRACT_ADDRESS,
} from "../../constants/contracts";
import Section from "../../containers/Section";
import MintComponent from "../MintComponent";
import NFTGallery from "./NFTGallery";
import MetalionABI from "../../contracts/MetalionABI.json";

import { isMainnet, isSaleStarted } from "../../constants/mintday";

export default function MintSection() {
  const [coffeeType, setCoffeeType] = useState("美式");
  const scrollTo = useBreakpointValue({ base: "content", xl: "mint" }) || "";

  const isAmericano = coffeeType === "美式";

  const isLatte = coffeeType === "拿鐵";

  const colorType = isAmericano ? "Red" : "Black";
  const pricing = isAmericano
    ? "價格: 100 MATIC / 999 TWD"
    : "價格: 130 MATIC / 1299 TWD";

  // Mint status
  const [totalSupplyLeft, setTotalSupplyLeft] = useState<number>();
  const [trueTotalSupply, setTrueTotalSupply] = useState<number>();
  const [currentTokenId, setCurrentTokenId] = useState<number>();

  console.log({ totalSupplyLeft, currentTokenId, trueTotalSupply });

  const getTotalSupply = useCallback(async () => {
    const infuraProvider = new ethers.providers.InfuraProvider(
      isMainnet ? "matic" : "maticmum",
      process.env.NEXT_PUBLIC_INFURA_ID
    );
    const contractABI = MetalionABI.abi;
    const contractAddress = isAmericano
      ? AMERICANO_CONTRACT_ADDRESS
      : LATTE_CONTRACT_ADDRESS;
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      infuraProvider
    );
    const _totalSupply = await contract.totalSupply();
    // convert into number
    const ct = Number(ethers.utils.formatUnits(_totalSupply, 0));

    setTotalSupplyLeft(ct < 7 ? 200 : 206 - ct);
    setTrueTotalSupply(206 - ct);
    setCurrentTokenId(ct);
  }, [isAmericano]);

  useEffect(() => {
    getTotalSupply();
  }, [coffeeType, getTotalSupply]);

  return (
    <Section
      name="mint"
      position="relative"
      overflow="hidden"
      bg="#F0EAEB"
      color="black"
      height={{ base: "100%", xl: "auto" }}
    >
      <Box textAlign={"center"} fontWeight="bold" color="#999">
        - 請選擇 -
      </Box>
      <Box w="full" pb={5}>
        <Flex
          justify="center"
          alignItems={"flex-start"}
          gap={6}
          // height={{ base: "120px", xl: "200px" }}
        >
          <Flex
            position="relative"
            direction="column"
            height={{ base: "120px", xl: "160px" }}
            // px={{ base: 0, xl: 6 }}

            justify="flex-end"
          >
            <Link
              to={scrollTo}
              smooth={true}
              offset={scrollTo === "mint" ? 0 : -30}
            >
              <Box
                _hover={{
                  cursor: "pointer",
                }}
                onClick={() => setCoffeeType("美式")}
              >
                {isAmericano && (
                  <Box
                    position="absolute"
                    top={{ base: "10px", xl: "10px" }}
                    left={{ base: "26px", xl: "35px" }}
                  >
                    <Box width={{ base: "12px", xl: "15px" }} fill={"#E6333F"}>
                      <svg
                        viewBox="0 0 28 47"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.6201 27.9272C8.95515 16.9662 8.87914 6.98115 17.4211 1.68915C21.8981 -1.08585 22.8711 -0.425845 20.1721 3.55216C16.3032 9.25216 16.8451 13.1341 22.7091 21.7401C29.3261 31.4501 29.5211 38.1291 23.3351 43.1401C19.6611 46.1161 17.0821 45.5161 19.6292 42.2771C22.9111 38.1051 22.3181 33.8722 17.6201 27.9272Z" />
                        <path d="M3.56915 35.8961C-0.973848 30.2431 -1.20085 23.9451 3.00815 20.3251C6.52715 17.2981 9.24815 17.0231 7.73715 19.8461C6.01015 23.0741 6.56315 26.1911 9.70215 30.9121C13.3151 36.3471 13.7121 41.9021 10.7021 44.9121C7.51315 48.1011 5.73014 47.5171 6.38214 43.4991C6.84214 40.6641 6.36515 39.3761 3.56915 35.8961Z" />
                      </svg>
                    </Box>
                  </Box>
                )}

                <Box
                  pl={{ base: "15px", xl: "17px" }}
                  width={{ base: "63px", xl: "85px" }}
                  fill={isAmericano ? "#E6333F" : "#999"}
                  pb={"5px"}
                >
                  <svg viewBox="0 0 94 88" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.43729e-05 1.75C-0.0169356 15.68 3.33809 77.033 4.21109 78.762C9.64609 89.528 52.9551 91.198 65.0411 81.108C67.6901 78.897 68.325 77.523 68.86 72.847C69.476 67.467 69.7571 67.022 75.7511 61.962C99.8281 41.637 100.009 15.642 76.0991 12.112L71.5021 11.433L71.6971 5.71704L71.8921 0H35.9471C2.38108 0 0.00206437 0.116 6.43729e-05 1.75ZM78.8571 23.425C86.5701 27.414 85.1481 37.585 75.4221 47.982C72.8411 50.742 70.4521 53.001 70.1151 53.002C69.6361 53.003 70.0541 37.29 70.8931 23.75C71.0291 21.571 74.9611 21.41 78.8571 23.425Z" />
                  </svg>
                </Box>
                <Text
                  color={isAmericano ? "#E6333F" : "#999"}
                  fontWeight="800"
                  fontSize={{ base: "md", xl: "2xl" }}
                  pb={3}
                  textAlign="center"
                >
                  美式
                </Text>
              </Box>
            </Link>
          </Flex>
          <Flex
            position="relative"
            direction="column"
            height={{ base: "120px", xl: "160px" }}
            // px={{ base: 5, xl: 6 }}
            justify="flex-end"
            // border="3px solid #E6333F"
            // borderRadius="20px"
          >
            <Link
              to={scrollTo}
              smooth={true}
              offset={scrollTo === "mint" ? 0 : -30}
            >
              <Box
                _hover={{
                  cursor: "pointer",
                }}
                onClick={() => setCoffeeType("拿鐵")}
              >
                {isLatte && (
                  <Box
                    position="absolute"
                    top={{ base: "26px", xl: "30px" }}
                    left={{ base: "20px", xl: "30px" }}
                  >
                    <Box
                      width={{ base: "12px", xl: "15px" }}
                      fill={isLatte ? "#E6333F" : "#999"}
                    >
                      <svg
                        viewBox="0 0 28 47"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.6201 27.9272C8.95515 16.9662 8.87914 6.98115 17.4211 1.68915C21.8981 -1.08585 22.8711 -0.425845 20.1721 3.55216C16.3032 9.25216 16.8451 13.1341 22.7091 21.7401C29.3261 31.4501 29.5211 38.1291 23.3351 43.1401C19.6611 46.1161 17.0821 45.5161 19.6292 42.2771C22.9111 38.1051 22.3181 33.8722 17.6201 27.9272Z" />
                        <path d="M3.56915 35.8961C-0.973848 30.2431 -1.20085 23.9451 3.00815 20.3251C6.52715 17.2981 9.24815 17.0231 7.73715 19.8461C6.01015 23.0741 6.56315 26.1911 9.70215 30.9121C13.3151 36.3471 13.7121 41.9021 10.7021 44.9121C7.51315 48.1011 5.73014 47.5171 6.38214 43.4991C6.84214 40.6641 6.36515 39.3761 3.56915 35.8961Z" />
                      </svg>
                    </Box>
                  </Box>
                )}

                <Box
                  pl="8px"
                  width={{ base: "52px", xl: "80px" }}
                  fill={isLatte ? "#E6333F" : "#999"}
                  pb={"5px"}
                >
                  <svg viewBox="0 0 101 65" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 3.87073C0 18.4577 10.244 46.2247 18.481 53.9627C19.866 55.2647 21 57.3597 21 58.6197C21 65.7807 61.832 66.3127 63.492 59.1737C64.692 54.0127 70.933 48.4127 79.348 44.9457C95.875 38.1367 103.565 28.1397 100.022 18.0677C97.908 12.0567 91.969 6.98071 87.05 6.98071C85.439 6.98071 85 6.33871 85 3.98071V0.980713H42.5H0V3.87073ZM76 10.3557C76 11.1117 75.719 13.1367 75.375 14.8557L74.75 17.9807H42.5H10.25L9.625 14.8557C9.281 13.1367 9 11.1117 9 10.3557C9 9.21671 14.742 8.98071 42.5 8.98071C70.258 8.98071 76 9.21671 76 10.3557ZM91.516 18.3067C94.867 23.0907 91.771 29.3517 83.791 33.9277C76.996 37.8247 76.806 37.7827 78.564 32.7997C79.375 30.4997 80.724 25.8877 81.562 22.5497C83.846 13.4467 83.507 13.9127 86.97 15.1207C88.654 15.7067 90.699 17.1407 91.516 18.3067Z" />
                  </svg>
                </Box>
                {/* <chakra.img
              style={{ paddingLeft: "10px" }}
              src="/latte.svg"
              height={{ base: "33.3px", xl: "10px" }}
              pb="5px"
            ></chakra.img> */}
                <Text
                  color={isLatte ? "#E6333F" : "#999"}
                  fontWeight="800"
                  fontSize={{ base: "md", xl: "2xl" }}
                  pb={3}
                  textAlign="center"
                >
                  拿鐵
                </Text>
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Box>
      {/* Circle */}
      <Box
        position="absolute"
        zIndex={0}
        top="0"
        left={{ base: "0", xl: "900px" }}
        width="100%"
        height="100%"
        backgroundColor="#E6333F"
        transform="translateZ(0) translate3d(0, 0, 0)"
        clipPath={{
          base: "circle(300px at center bottom)",
          sm: "circle(320px at center bottom)",
          md: "circle(500px at center bottom)",
          xl: "circle(600px at center 60vh)",
        }}
      ></Box>
      {/* Content */}

      <Flex direction="column">
        <Flex
          id="content"
          justifyContent={"space-between"}
          maxW={"8xl"}
          // pt={{ base: "0", xl: "200px" }}
          w="100%"
          mx="auto"
          alignItems="center"
          // gap={isLatte ? 20 : 0}
          direction={{ base: "column", xl: "row" }}
        >
          {/* Rightside Content */}
          <Box
            maxW={"800px"}
            // pb={{ base: isAmericano ? "auto" : "100px" }}
            position="relative"
            alignSelf={"flex-start"}
          >
            <Heading
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
              mb={5}
            >
              早安！想喝杯{" "}
              <chakra.span
                fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}
                // color="#964145"
              >
                {" "}
                {coffeeType}
              </chakra.span>
              <br /> 就來
              <chakra.img
                src="/gonna_logo_text_red.svg"
                alt="Gonna logo"
                style={{
                  marginLeft: "10px",
                  display: "inline",
                  height: "60px",
                  verticalAlign: "middle",
                }}
              />
            </Heading>
            <Text
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "xl", lg: "4xl" }}
            >
              <i>
                {isAmericano
                  ? "A good day starts with good coffee"
                  : "Can’t live without good coffee"}
              </i>
            </Text>
            <Text
              maxW="620px"
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "2xl", lg: "3xl" }}
            >
              <br />
              {`Metalionlion Getting Coffee - ${colorType}`}
              <chakra.br display={{ base: "none", xs: "block" }} />
              NFT持有者可於 <b>7 月 7 號至 8 月 5 日</b>
              ，每日至全台gonna共樂遊門市免費兌換<b>{`${coffeeType}咖啡`}</b>
              乙杯，賦能期間內另可兌換價值170元的gonna手工甜點乙份，未來還可享有各種宙獅計劃的優先參與權
            </Text>

            <NFTGallery
              coffee="americano"
              display={isAmericano ? "flex" : "none"}
            />
            <NFTGallery coffee="latte" display={isLatte ? "flex" : "none"} />

            <Text
              mt={10}
              maxW="2xl"
              fontWeight={"bold"}
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "2xl", lg: "3xl" }}
            >
              {pricing}
            </Text>

            {/* Mint Status */}
            {isSaleStarted && (
              <Text
                mt={10}
                maxW="2xl"
                fontWeight={"bold"}
                textAlign={{ base: "center", md: "center", xl: "left" }}
                fontSize={{ base: "2xl", lg: "3xl" }}
              >
                尚餘 {totalSupplyLeft}/200 張
              </Text>
            )}

            {/* Mint Component */}
            {isAmericano && (
              <MintComponent
                trueTotalSupply={0}
                colorType={"Red"}
                coffeeType={"美式"}
                contractAddress={AMERICANO_CONTRACT_ADDRESS}
              />
            )}
            {isLatte && (
              <MintComponent
                trueTotalSupply={trueTotalSupply as number}
                colorType={"Black"}
                coffeeType={"拿鐵"}
                contractAddress={LATTE_CONTRACT_ADDRESS}
              />
            )}
            {/* <MintComponent contractAddress={LATTE_CONTRACT_ADDRESS}/> */}
          </Box>
          {/* Leftside: Coffee Image */}
          <Flex
            justifyContent={{ base: "center", xl: "flex-end" }}
            alignItems="center"
            minW={{ base: "full", xl: "600px" }}
            mb={{ base: 0, md: isAmericano ? "0" : "150px" }}
          >
            <chakra.img
              alignSelf={"flex-end"}
              zIndex={2}
              marginTop={{
                base: isAmericano ? "50px" : "20px",
                xl: isLatte ? "100px" : "0",
              }}
              // This casues animation but shifts screen
              // TODO: get gonna's opinion
              width={{
                base: isAmericano ? "300px" : "400px",
                md: isAmericano ? "400px" : "500px",
                lg: isAmericano ? "400px" : "500px",
                xl: isAmericano ? "500px" : "500px",
              }}
              // width={{
              //   base: isAmericano ? "200px" : "350px",
              //   md: isAmericano ? "300px" : "500px",
              //   lg: isAmericano ? "350px" : "600px",
              //   xl: isAmericano ? "500px" : "600px",
              // }}
              paddingLeft={{ xl: isAmericano ? "100px" : "0" }}
              // TODO: get gonna's opinion
              // pt={{ base: isLatte ? "50px" : "0" }}
              // pt={{ base: isLatte ? "50px" : "0" }}
              // TODO: get gonna's opinion
              src={isAmericano ? "/gonna-americano2.png" : "/gonna-latte2.png"}
              // src={isAmericano ? "/americano2.png" : "/latte.png"}
              alt="americano"
              // This casues animation but shifts screen
              // transition="1s"
              willChange={"transform"}
              _hover={{
                willChange: "transform",
                // transform: isAmericano
                //   ? "translateZ(0) translate3d(0, 0, 0) translateY(-40px) rotate(-10deg)"
                //   : "translateZ(0) translate3d(0, 0, 0) translateY(-40px)",
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Section>
  );
}

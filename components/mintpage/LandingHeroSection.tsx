import {
  Text,
  Image,
  Button,
  Flex,
  Box,
  Heading,
  chakra,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-scroll";
import Section from "../../containers/Section";
import SpinningCoffee from "../SpinningCoffee";
import Countdown from "react-countdown";

import { isSaleStarted } from "../../constants/mintday";

export default function LandingHeroSection() {
  const [displayClock, showDisplayClock] = useState(false);

  const scrollTo = useBreakpointValue({ base: "content", xl: "mint" }) || "";

  useEffect(() => {
    showDisplayClock(true);
  }, []);
  const DisplayDateTime = ({ children }: { children: ReactNode }) => (
    <chakra.span
      fontSize={{ base: "3xl", sm: "5xl", lg: "7xl" }}
      fontWeight="normal"
      marginLeft="10px"
      fontFamily={"Dax"}
    >
      {children}
    </chakra.span>
  );
  const countdownTitleLeftPosition = useBreakpointValue({
    base: "50%",
    xl: "0",
  });
  const countdownTitleTransform = useBreakpointValue({
    base: "translate(-50%,0)",
    xl: "none",
  });
  const mintCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (!displayClock) {
      return <></>;
    } else {
      if (completed) {
        // TODO: getMint
        <></>;
        return;
      } else {
        return (
          <Heading
            textAlign={{ base: "center", xl: "left" }}
            mt="100px"
            fontSize="xl"
            position={"relative"}
            _before={{
              content: "'倒數'",
              position: "absolute",
              top: "-25px",
              left: countdownTitleLeftPosition,
              transform: countdownTitleTransform,
            }}
          >
            <DisplayDateTime>{days}</DisplayDateTime>天
            <DisplayDateTime>{hours}</DisplayDateTime>小時
            <DisplayDateTime>{minutes}</DisplayDateTime>分鐘
            <DisplayDateTime>{seconds}</DisplayDateTime>秒
          </Heading>
        );
      }
    }
  };
  return (
    <Section name="landing" bg={"#E6333F"} overflow="hidden" color="white">
      {/* <Box pt={"20%"}> */}
      <Flex
        justify="space-between"
        direction={{ base: "column", xl: "row" }}
        px={15}
        mx="auto"
        maxW={"8xl"}
        mt="20%"
      >
        <Box>
          <Box width={{ base: "full", xl: "700px" }}>
            {/* <Flex
              gap={1}
              direction={"column"}
              position="absolute"
              top="50%"
              transform="translateY(-80%)"
            > */}
            <Image
              src="/metalionxgonna.svg"
              alt=""
              mb="50px"
              mx={{ base: "auto", xl: "0" }}
            ></Image>

            <Text
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "3xl", lg: "4xl" }}
              // mb={5}
            >
              Metalion 宙獅計劃：
            </Text>
            <Heading
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "4xl", sm: "5xl", lg: "7xl" }}
              mb={12}
            >
              請你喝 gonna 咖啡
            </Heading>

            {/* <Text
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "3xl", lg: "5xl" }}
              mb={5}
            >
              請你喝gonna咖啡30天
            </Text> */}
            <Text
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "2xl", lg: "3xl" }}
              pr={{ base: "0", xl: "120px" }}
            >
              6月30日起、
              <b>400張 Metalion Getting Coffee 宙獅咖啡卡 NFT 將公諸於世。</b>
              持有者將可享受連續30日，至 gonna 門市每日免費兌換咖啡乙杯 —
              <b>
                <i>你準備好了嗎？</i>
              </b>
            </Text>

            <Text
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "2xl", lg: "3xl" }}
              mt={"50px"}
            ></Text>

            {isSaleStarted ? (
              <Link
                to={scrollTo}
                smooth={true}
                offset={scrollTo === "mint" ? 0 : -30}
              >
                <Button
                  w={{ base: "full", xl: "auto" }}
                  mx="0 auto"
                  isDisabled={true}
                  minW="200px"
                  py="30px"
                  size="lg"
                  borderRadius={"20px"}
                  colorScheme={"red"}
                  bg="red.700"
                  color="white"
                >
                  全數售完
                </Button>
              </Link>
            ) : (
              <Countdown
                date={"2022-06-30T00:00:00"}
                renderer={mintCountdown}
              />
            )}

            {/* ，持有者將可享受連續30日，至gonna門市每日免費兌換咖啡乙杯，並享有未來宙獅計劃的優先參與權 */}
            {/* <MintCountDown /> */}
            {/* </Flex> */}
          </Box>
        </Box>
        <Box height="100%">
          <Box my={{ base: "50px", lg: "150px" }}>
            <SpinningCoffee />
          </Box>
        </Box>
      </Flex>
    </Section>
  );
}

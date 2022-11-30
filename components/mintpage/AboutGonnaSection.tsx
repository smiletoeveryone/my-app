import {
  Text,
  Flex,
  Box,
  Heading,
  chakra,
  // HStack,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const gonnaStores = [
  {
    name: "內湖旗艦店",
    phone: "(02) 8793-9663",
    address: "台北內湖區石潭路145號",
  },
  {
    name: "仁愛概念店",
    phone: "(02) 2772-5755",
    address: "台北市大安區仁愛路四段109號1樓",
  },
  {
    name: "南港中信店",
    phone: "(02) 2651-5525",
    address: "中國信託金融園區Ｃ棟1F",
  },
  {
    name: "台北京站店",
    phone: "(02) 2558-7968",
    address: "京站時尚廣場 1F 經典大道",
  },
  {
    name: "竹北享平方店 (尚未提供兌換)",
    phone: "(準備中)",
    address: "",
  },
  {
    name: "EXPRESS Sogo忠孝店 (尚未提供兌換)",
    phone: "(02) 2711-0598",
    address: "忠孝SOGO B1美食街",
  },
];

export default function AboutGonnaSection() {
  return (
    <Flex
      // maxH="100vh"
      overflowY="hidden"
      direction={{ base: "column", xl: "row" }}
      // width={{ base: "full", lg: "100%" }}
      minH={{ base: "4xl", xl: "100vh" }}
      // justifyContent="space-between"
      justify="center"
      alignItems="center"
      color="white"
      bg="#E6333F"
    >
      <Box
        mx="auto"
        // px={{ base: 15 }}
        // pt="20%"
        flex="50%"
        // maxW={"800px"}

        minH={{ base: "2xl", xl: "100vh" }}
        position="relative"
      >
        <Flex
          justify="center"
          alignItems="center"
          direction={{ base: "column", xl: "row" }}
        >
          <Box maxWidth="4xl" mt="100px" px={{ base: 8, xl: 20 }}>
            <Heading
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "4xl", sm: "5xl", lg: "6xl" }}
              mb={5}
            >
              <chakra.img
                src="/gonna_logo_text_white.svg"
                alt="Gonna logo"
                mr={{ base: "0", md: "10px" }}
                style={{
                  display: "inline",
                  height: "60px",
                  verticalAlign: "middle",
                }}
              />
              <chakra.br display={{ base: "block", md: "none" }} />
              共樂遊
            </Heading>
            <Text
              mb={5}
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "lg", lg: "3xl" }}
            >
              地中海飲食概念 / 原型食物 / 健康餐廳
            </Text>
            <Text
              textAlign={{ base: "center", md: "center", xl: "left" }}
              fontSize={{ base: "2xl", lg: "3xl" }}
            >
              以風靡歐美的 Fast Slow Food 精神， 提供健康美味的快速慢食！
              精選季節良食、多色蔬果、超級食物與最好的肉類，在開放式廚房看得見手工自製的料理過程，提供明亮寬敞的座位與自由自在的舒適用餐空間，在一餐中就能均衡攝取營養，每天都能享用好肉好菜！
            </Text>

            <Stack mt={"50px"} mb="50px">
              {gonnaStores.map(({ name, phone, address }, i) => (
                <Box key={i} pb={5}>
                  <Heading fontSize={{ base: "2xl", lg: "3xl" }}>
                    {name}
                  </Heading>
                  <Text fontSize={{ base: "2xl", lg: "3xl" }}>{address}</Text>
                  <Text fontSize={{ base: "2xl", lg: "3xl" }}>{phone}</Text>
                </Box>
              ))}
            </Stack>

            <Flex mb="25px" justify={"flex-end"}>
              <Box>
                <Stack direction="row" align={"center"} spacing={3}>
                  <Box></Box>
                  <Text fontSize="25px" fontStyle={"italic"}>
                    Follow Us!
                  </Text>
                  <NextLink passHref href="https://www.facebook.com/gonnacafe">
                    <a target="_blank">
                      <FaFacebook size="40px" />
                    </a>
                  </NextLink>
                  <NextLink
                    passHref
                    href="https://www.instagram.com/gonna_cafe/"
                  >
                    <a target="_blank">
                      <FaInstagram size="40px" />
                    </a>
                  </NextLink>
                </Stack>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box
        flex="50%"
        alignSelf="flex-start"
        minH={{ base: "2xl", xl: "100vh" }}
        // h={"100vh"}
        w={{ base: "full" }}
        // minH={"50vh"}
        // w={{ base: "full" }}
        // h={{ base: "full" }}
        // maxW={"800px"}
        position="relative"

        // backgroundRepeat="no-repeat"
      >
        <Box
          top="0"
          width="100%"
          height={{ base: "100%", lg: "120%", xl: "160%" }}
          position="absolute"
          alignItems="stretch"
          alignSelf={"flex-start"}
          background="url(/gonna-food.jpg)"
          backgroundSize="cover"
          backgroundRepeat={"no-repeat"}
          // backgroundAttachment={"fixed"}
          backgroundPosition="center"
        />
      </Box>
    </Flex>
  );
}

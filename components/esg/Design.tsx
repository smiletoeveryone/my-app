import {
  Box,
  chakra,
  Container,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function Design() {
  return (
    <Box
      bg="#F8F3DC"
      position="relative"
      pb={"100px"}
      overflow="hidden"
      zIndex={1}
      fontSize={{ base: "xl", md: "2xl" }}
    >
      <Container textAlign={"center"} maxW="1000px">
        <Heading color="#ECA053" pt="60px">
          ESG設計款NFT
        </Heading>

        <chakra.img
          mt="60px"
          position="relative"
          mx="auto"
          borderRadius="10px"
          width="350px"
          src="/esg/frog.jpeg"
          boxShadow={"20px 20px 0 -3px #F8F3DC, 20px 20px 0 0 #B49060;"}
        ></chakra.img>

        <Heading color="#444444" mt="40px">
          青蛙
        </Heading>
        <Text color="#444444" mt="20px" px={4}>
          成長茁壯的希望攜帶著盎然的綠意與清澈的水源，乾淨的環境沒有農藥的殘害，有潔癖的青蛙也開始出現了。在熱情的蛙唱中，樹木植物也更用力的進行光合作用，造氧排碳
        </Text>

        <Heading color="#B49060" mt="100px">
          待公開限量卡片
        </Heading>

        <SimpleGrid
          mt="60px"
          mx="auto"
          columns={{ base: 2, md: 2, lg: 4 }}
          spacing={8}
        >
          <Box>
            <Box
              mx="auto"
              color="white"
              height="245px"
              maxW="175px"
              borderRadius="10px"
              background="#B49060"
              boxShadow={"15px 15px 0 -3px #F8F3DC, 15px 15px 0 0 #B49060;"}
            >
              <Text fontSize="160px">?</Text>
            </Box>
          </Box>
          <Box>
            <Box
              mx="auto"
              color="white"
              height="245px"
              maxW="175px"
              borderRadius="10px"
              background="#B49060"
              boxShadow={"15px 15px 0 -3px #F8F3DC, 15px 15px 0 0 #B49060;"}
            >
              <Text fontSize="160px">?</Text>
            </Box>
          </Box>
          <Box>
            <Box
              mx="auto"
              color="white"
              height="245px"
              maxW="175px"
              borderRadius="10px"
              background="#B49060"
              boxShadow={"15px 15px 0 -3px #F8F3DC, 15px 15px 0 0 #B49060;"}
            >
              <Text fontSize="160px">?</Text>
            </Box>
          </Box>
          <Box>
            <Box
              mx="auto"
              color="white"
              height="245px"
              maxW="175px"
              borderRadius="10px"
              background="#B49060"
              boxShadow={"15px 15px 0 -3px #F8F3DC, 15px 15px 0 0 #B49060;"}
            >
              <Text fontSize="160px">?</Text>
            </Box>
          </Box>
        </SimpleGrid>
        {/* 
        <Box maxW="800px" mx="auto" pt="160px" pb="30px">
          <Heading color="#ECA053">作者介紹</Heading>
          <HStack spacing={{ base: 5, md: 10 }} mt="20px">
            <VStack>
              <chakra.img
                width={{ base: "600px", md: "500px" }}
                src="/esg/artist.png"
                alt="冉綾珮"
                borderRadius="50%"
              />
              <Text>冉綾珮</Text>
            </VStack>
            <Text textAlign={"justify"} pr="4">
              高雄人，自由養狗養貓工作者，永遠都只有十五分鐘的專注力，不管怎麼努力，永遠都只有十五分鐘的專注力，生而為人覺得對世界有些使命感，如果畫圖能夠做點事，那我想為動物和環境說點話,為動物和環境做點事！
            </Text>
          </HStack>
        </Box> */}
      </Container>
      <Box
        clipPath={"circle(700px at 50% 100%)"}
        position="absolute"
        bottom={"-200px"}
        width="full"
        height="700px"
        bg="#F8EFC4"
        bgRepeat={"no-repeat"}
        bgPosition="bottom"
        zIndex={-1}
      ></Box>
      <Box
        position="absolute"
        zIndex={-1}
        right="0"
        bottom={{ sm: "-15px", lg: "-20px" }}
      >
        <chakra.img
          src="/esg/tree.svg"
          width={{ base: "180px", lg: "280px" }}
        ></chakra.img>
      </Box>
      <Box position="absolute" zIndex={-1} left="0" bottom="-10px">
        <chakra.img
          src="/esg/tree2.svg"
          width={{ base: "180px", lg: "280px" }}
        ></chakra.img>
      </Box>
    </Box>
  );
}

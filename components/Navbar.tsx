import NextLink from "next/link";
import {
  Box,
  Flex,
  Badge,
  Button,
  Stack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { MdOutlineAccountBalanceWallet, MdLogout } from "react-icons/md";

import AccountInfo from "./AccountInfo";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiOutlineMenu } from "react-icons/ai";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
// import Logo from "./Logo";

// interface NavItem {
//   label: string;
//   subLabel?: string;
//   children?: Array<NavItem>;
//   href?: string;
// }

// const NAV_ITEMS_ZH: Array<NavItem> = [
//   {
//     label: "帳號",
//   },
//   {
//     label: "活動",
//   },
// ];

export default function Navbar() {
  const { pathname } = useRouter();
  const { disconnect, connect, isAuth } = useAuthContext();

  const isESG = pathname === "/esg";

  return (
    <Box
      color={isESG ? "gray" : "white"}
      position={"absolute"}
      zIndex={"99"}
      borderStyle={"solid"}
      w="full"
    >
      <Flex
        color={isESG ? "gray" : "white"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        mx={"auto"}
        maxW={"8xl"}
        w={{ base: "full" }}
        align={"center"}
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          alignItems="center"
          flex={{ base: 1 }}
          justify={{ base: "left", md: "start" }}
        >
          <NextLink passHref href="/">
            <a>
              <svg
                width="50"
                height="40"
                viewBox="0 0 50 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.9957 0.388341C17.364 1.27212 13.5991 3.92325 12.1856 6.5924C11.4907 7.9046 11.4725 7.89824 14.7791 7.51712C16.3523 7.33578 18.1449 7.18731 18.7632 7.1871C19.9376 7.18689 20.321 6.96208 21.0638 5.83885C22.4441 3.75167 27.0672 2.28125 30.7931 2.74403C33.521 3.08295 33.5437 2.50839 30.8505 1.29036C27.9864 -0.00487428 24.0811 -0.362458 20.9957 0.388341ZM27.1747 4.4592C25.6933 4.70247 24.0529 5.4433 23.0347 6.32899C22.0616 7.17544 22.0537 7.3046 22.9558 7.59962C24.9357 8.24692 26.0163 10.9547 25.1318 13.052C24.9552 13.4709 24.8107 13.8274 24.8107 13.8444C24.8107 13.8614 25.7016 13.8826 26.7908 13.8917C30.2785 13.921 33.131 14.9568 37.5747 17.8086C41.9216 20.598 44.5547 21.138 47.222 19.7863C48.7787 18.9976 48.8627 18.6518 47.6399 18.0633C46.1602 17.3511 45.2339 16.42 42.9387 13.3375C37.4888 6.01912 33.0156 3.4997 27.1747 4.4592ZM15.4986 9.1044C9.50395 9.83166 0.520238 11.041 0.353476 11.143C-0.233507 11.5025 0.565835 12.8206 1.79803 13.5256C2.15788 13.7316 2.05534 13.7625 1.15581 13.7195L0.085459 13.6686L0.0216658 15.2412C-0.166931 19.8977 0.856972 21.609 3.8317 21.609C5.31993 21.609 6.47334 22.0116 6.81907 22.6514C7.05134 23.0816 7.01344 23.0937 5.43424 23.0937C2.80352 23.0937 1.86889 23.9624 1.46365 26.7842C1.07061 29.5206 1.46707 29.8733 4.94316 29.8782L6.5898 29.8805L7.83055 28.8048C9.42089 27.4258 11.0078 26.4773 13.0984 25.6557C18.8989 23.3759 21.3678 20.4521 21.3823 15.844C21.3851 14.9848 21.472 14.7901 22.0269 14.3986C23.4697 13.3808 24.1143 11.3789 23.3901 10.1646C22.5246 8.71288 20.7221 8.47067 15.4986 9.1044ZM15.5348 11.9241C15.7435 12.1307 14.8103 13.0489 14.0924 13.3437C13.3994 13.6279 12.0734 13.0631 12.0734 12.4834C12.0734 11.7977 14.9396 11.3345 15.5348 11.9241ZM24.3256 15.7445C23.0943 16.09 23.2614 15.8393 22.8314 17.9831C22.3566 20.3501 21.6114 21.788 19.9628 23.5195L18.5973 24.9535L19.5653 25.0973C21.313 25.3571 23.3738 26.188 27.6334 28.3512C35.5491 32.3707 39.8498 33.0074 44.2738 30.8146C46.6556 29.6341 49.0594 26.7838 49.2561 24.9066L49.3218 24.2807L47.6868 24.236C44.7043 24.1543 41.5945 22.8162 37.5128 19.8586C32.6014 16.2996 27.7462 14.7848 24.3256 15.7445ZM15.2256 26.7987C11.9514 27.5304 8.78617 29.8103 7.10678 32.6468C6.10043 34.3463 6.06168 34.5132 6.64867 34.6188C10.0667 35.2333 11.3379 35.5529 13.2508 36.2787C14.4871 36.7478 16.5101 37.5158 17.7463 37.9854C25.0496 40.7595 30.2477 40.6736 35.2154 37.6971C36.6381 36.8447 38.2972 35.3181 38.2972 34.8615C38.2972 34.4895 38.3282 34.5018 36.1565 34.0174C34.014 33.5397 31.044 32.2808 27.9147 30.524C21.4772 26.91 18.56 26.0536 15.2256 26.7987Z"
                  fill={isESG ? "#808080" : "white"}
                />
              </svg>
            </a>
          </NextLink>
          {process.env.NEXT_PUBLIC_NETWORK_TYPE === "testnet" && (
            <Badge
              opacity={"1"}
              variant="solid"
              colorScheme="purple"
              fontSize="0.6rem"
            >
              Testnet
            </Badge>
          )}

          <Flex
            alignItems="center"
            display={{ base: "none", md: "flex" }}
            flex={{ base: 1 }}
            ml={10}
            minH={"40px"}
            justify={"flex-end"}
          >
            {/* <DesktopNav items={NAV_ITEMS} /> */}
          </Flex>
        </Flex>

        <Stack
          display={{ base: "flex", md: "flex" }}
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={3}
        >
          <NextLink passHref href="/gonna">
            <a>
              <Button
                variant="text"
                color={isESG ? "gray" : "white"}
                fontSize={"lg"}
                fontStyle={"italic"}
                display={{ base: "none", md: "flex" }}
              >
                gonna
              </Button>
            </a>
          </NextLink>
          {/* <NextLink passHref href="/esg">
            <a>
              <Button
                variant="text"
                color={isESG ? "gray" : "white"}
                fontSize={"lg"}
                display={{ base: "none", md: "flex" }}
              >
                欣傳媒 ESG NFT
              </Button>
            </a>
          </NextLink> */}
          <NextLink passHref href="/tokens">
            <a>
              <Button
                variant="text"
                fontSize={"lg"}
                display={{ base: "none", md: "flex" }}
              >
                Ｍetalion 俱樂部
              </Button>
            </a>
          </NextLink>
          <NextLink passHref href="https://discord.gg/metalion">
            <a target="_blank">
              <Button
                variant="text"
                fontSize={"lg"}
                display={{ base: "none", md: "flex" }}
              >
                加入 Discord
              </Button>
            </a>
          </NextLink>
          {isAuth ? (
            <Menu placement={"bottom-end"} autoSelect={false}>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                bg="whiteAlpha.200"
                _hover={{
                  bg: "whiteAlpha.300",
                }}
                _active={{
                  bg: "whiteAlpha.300",
                }}
              >
                <AccountInfo />
              </MenuButton>

              <MenuList
                minW="60px"
                alignItems={"flex-end"}
                bg={isESG ? "white" : "brand.500"}
              >
                <MenuItem
                  icon={<MdLogout />}
                  border="brand.600"
                  onClick={disconnect()}
                  bg={isESG ? "white" : "brand.500"}
                  _hover={{
                    bg: "brand.400",
                    color: "white",
                  }}
                >
                  登出
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              leftIcon={<MdOutlineAccountBalanceWallet />}
              px={3}
              fontSize={"md"}
              fontWeight={600}
              bg={isESG ? "white" : "brand.500"}
              _hover={{
                bg: "whiteAlpha.300",
              }}
              _active={{
                bg: "whiteAlpha.300",
              }}
              // TODO Check connect type
              onClick={connect as () => Promise<void>}
            >
              連結錢包
            </Button>
          )}

          <Box display={{ base: "flex", md: "none" }}>
            <Menu placement={"bottom-end"} autoSelect={false}>
              <MenuButton
                as={Button}
                bg="whiteAlpha.200"
                _hover={{
                  bg: "whiteAlpha.300",
                }}
                _active={{
                  bg: "whiteAlpha.300",
                }}
              >
                <AiOutlineMenu />
              </MenuButton>
              <MenuList
                bg={isESG ? "white" : "brand.500"}
                border="brand.600"
                minW="60px"
                alignItems={"self-end"}
              >
                <MenuItem
                  fontSize={"xl"}
                  fontStyle={"italic"}
                  _hover={{
                    bg: "brand.400",
                    color: "white",
                  }}
                >
                  <NextLink passHref href="/gonna">
                    <a>gonna</a>
                  </NextLink>
                </MenuItem>
                {/* <MenuItem
                  fontSize={"xl"}
                  _hover={{
                    bg: "brand.400",
                    color: "white",
                  }}
                >
                  <NextLink passHref href="/esg">
                    <a>欣傳媒 ESG NFT</a>
                  </NextLink>
                </MenuItem> */}
                <MenuItem
                  fontSize="xl"
                  _hover={{
                    bg: "brand.400",
                    color: "white",
                  }}
                >
                  <NextLink passHref href="/tokens">
                    <a>Ｍetalion 俱樂部</a>
                  </NextLink>
                </MenuItem>
                <MenuItem
                  fontSize="xl"
                  _hover={{
                    bg: "brand.400",
                    color: "white",
                  }}
                >
                  <NextLink passHref href="https://discord.gg/metalion">
                    <a>加入 Discord</a>
                  </NextLink>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}

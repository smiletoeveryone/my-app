import React from "react";
import { Heading, Text } from "@chakra-ui/react";

export default function AuthError() {
  return (
    <>
      <Heading as={"h3"} fontSize="2xl">
        意外錯誤 :(
      </Heading>
      <Text mt={10}>抱歉伺服器發生錯誤，無法完成您的請求</Text>
      <Text>請稍候一下再刷新頁面重試</Text>
    </>
  );
}

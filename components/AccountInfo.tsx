import React from "react";
import { useCookies } from "react-cookie";
import { Button, Text, useBreakpointValue } from "@chakra-ui/react";
import BlockieIdenticon from "./BlockiesAvatar";
import { truncateAddress } from "../helpers/utilities";
import { useAuthContext } from "../context/AuthContext";

export default function AccountInfo() {
  const { address, disconnect } = useAuthContext();
  const [, , removeCookie] = useCookies();

  const displayAddress = useBreakpointValue({
    base: truncateAddress(address as string, { short: true }),
    md: truncateAddress(address as string, { short: true }),
  });

  const handleDisconnect = () => {
    removeCookie("token");
    removeCookie("refreshToken");
    disconnect?.();
  };
  return (
    <>
      <Button
        px={{ base: 0, md: 2 }}
        leftIcon={
          <BlockieIdenticon
            // @ts-ignore TODO Check address type
            address={address as string}
            diameter={28}
            borderRadius="50%"
          />
        }
        bg={"transparent"}
        onClick={handleDisconnect}
      >
        <Text fontSize={{ base: "xs" }}>{displayAddress}</Text>
      </Button>
    </>
  );
}

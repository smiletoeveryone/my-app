import {
  Text,
  Button,
  useBreakpointValue,
  useColorModeValue,
  keyframes,
} from "@chakra-ui/react";
import NextLink from "next/link";
interface LogoProps {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function Logo({ size }: LogoProps) {
  const glow = keyframes`
from {
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 10px #ff1177,
0 0 10px #ff1177, 0 0 10px #ff1177, 0 0 10px #ff1177, 0 0 15px #ff1177;
}
to {
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 25px #ff1177,
0 0 25px #ff1177, 0 0 25px #ff1177, 0 0 25px #ff1177, 0 0 20px #ff1177;
}
`;
  const glowBlue = keyframes`
from {
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 10px #07e8fa,
0 0 10px #07e8fa, 0 0 10px #07e8fa, 0 0 10px #07e8fa, 0 0 15px #07e8fa;
}
to {
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 25px #07e8fa,
0 0 25px #07e8fa, 0 0 25px #07e8fa, 0 0 25px #07e8fa, 0 0 20px #07e8fa;
}
`;

  const animation = `${glow} infinite 1.5s ease-in-out alternate`;
  const animationBlue = `${glowBlue} infinite 1.5s ease-in-out alternate`;
  return (
    <NextLink passHref href="/">
      <a>
        <Button
          variant={"link"}
          textDecor={"none"}
          fontWeight="normal"
          animation={animation}
          transition="text-shadow 1s ease"
          _hover={{
            textDecor: "none",
            animation: animationBlue,
          }}
          _focus={{
            textDecor: "none",
            animation: animationBlue,
          }}
        >
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"Pacifico"}
            fontSize={size}
            color={useColorModeValue("white", "white")}
          >
            Metalion
          </Text>
        </Button>
      </a>
    </NextLink>
  );
}

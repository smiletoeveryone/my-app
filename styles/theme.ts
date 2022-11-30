import { extendTheme } from "@chakra-ui/react";
// import { flashless } from 'chakra-ui-flashless';

const colors = {
  brand: {
    "50": "#FCE8E8",
    "100": "#F7C0C0",
    "200": "#F19797",
    "300": "#EC6F6F",
    "400": "#E74646",
    "500": "#E21D1D",
    "600": "#B41818",
    "700": "#871212",
    "800": "#5A0C0C",
    "900": "#2D0606",
  },
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      fontFamily: "Dax, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      color: "#666",
    },
  },
};

const components = {
  Heading: {
    baseStyle: {
      fontFamily: "Dax, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    },
  },
};

const theme = extendTheme({ colors: colors, config, styles, components });

export default theme;

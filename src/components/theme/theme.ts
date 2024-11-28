import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    lightGray: {
      50: "#FFFFFF",  // Pure white
      100: "#FCFCFC", // Almost white
      200: "#F9F9F9", 
      300: "#F5F5F5", // Very light gray (primary color)
      400: "#EEEEEE", 
      500: "#E0E0E0", 
      600: "#BDBDBD", 
      700: "#9E9E9E", 
      800: "#757575", 
      900: "#616161", 
    },
  },
  styles: {
    global: {
      "html, body": {
        bg: "lightGray.300", // Very light gray background
        color: "gray.800",   // Neutral text color
      },
    },
  },
});

export default theme;

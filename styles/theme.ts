import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";

const theme = extendTheme({
  fonts: { body: "Inter" },

  styles: {
    global: (props: Dict<any>) => ({
      body: {
        bg: mode("#555b6e", "dark")(props),
        color: mode("#faf9f9", "light")(props),
      },
    }),
  },
});

export default theme;

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",

  typography: {
    fontFamily: "var(--font-YekanBakh)",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "none",
          padding: "10px 22px",
        },
      },
    },
  },
});

export default theme;

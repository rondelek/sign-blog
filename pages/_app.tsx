import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Layout } from "../components";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 600px)": {
            padding: ".5rem 0",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-12 my-2">
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </div>
  );
}

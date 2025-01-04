import React, { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "@/components/common/text-card/TextCard.scss";
import "@/components/common/wheel/Wheel.scss";

interface LayoutProps {
  children: ReactNode;
}

export default function StyleLayout({ children }: LayoutProps) {
  const theme = createTheme({
    breakpoints: {
        values: {
          xs: 0,
          sm: 550,
          md: 768,
          lg: 992,
          xl: 1920,
        },
      },
    palette: {
      mode: "dark",
      background: {
        default: "#000000",
        paper: "#FFD700",
      },
      text: {
        primary: "#ffffff",
        secondary: "#000000",
      },
      secondary: {
        main: "#f5f2f2",
        contrastText: "#ffffff",
      },
      primary: {
        main: "#ffffff",
        contrastText: "#000",
      },
    },
    typography: {
      h1: {
        fontSize: "2rem",
        fontWeight: 700,
        lineHeight: 1.5,
        "@media (min-width: 600px)": { fontSize: "2.5rem" },
        "@media (min-width: 768px)": { fontSize: "3rem" },
        "@media (min-width: 992px)": { fontSize: "3.5rem" },
      },
      h2: {
        fontSize: "1.2rem",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.6,
        "@media (min-width: 600px)": { fontSize: "1.025rem" },
        "@media (min-width: 768px)": { fontSize: "1.125rem" },
        "@media (min-width: 992px)": { fontSize: "1.175rem" },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

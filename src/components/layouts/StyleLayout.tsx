import React, { useMemo, useState, createContext, ReactNode } from 'react';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import '@/components/common/text-card/TextCard.scss'
import "@/components/common/wheel/Wheel.scss";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

interface LayoutProps {
    children: ReactNode;
}

export default function StyleLayout({ children }: LayoutProps) {
    const [mode, setMode] = useState<PaletteMode>('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode(mode === 'dark' ? 'light' : 'dark');
            },
        }),
        [mode]
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    background: {
                        default: "#000000",
                        paper: "#FFD700",
                    },
                    text: {
                        primary: "#ffffff",
                        secondary: "#000000"
                    },
                    secondary: {
                        main: "#f5f2f2",
                        contrastText: "#ffffff", 
                    },
                    primary: {
                        main: "#ffffff",
                        contrastText: "#000",
                    }
                },
                typography: {
                    h1: {
                        fontSize: "2rem",
                        fontWeight: 700,
                        lineHeight: 1.5,
                        [createTheme().breakpoints.up("sm")]: {
                            fontSize: "2.5rem",
                        },
                        [createTheme().breakpoints.up("md")]: {
                            fontSize: "3rem",
                        },
                        [createTheme().breakpoints.up("lg")]: {
                            fontSize: "3.5rem",
                        },
                    },
                    h2: {
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        lineHeight: 1.4,
                    },
                    body1: {
                        fontSize: "1rem",
                        lineHeight: 1.6,
                        [createTheme().breakpoints.up("sm")]: {
                            fontSize: "1.125rem",
                        },
                        [createTheme().breakpoints.up("md")]: {
                            fontSize: "1.25rem",
                        },
                        [createTheme().breakpoints.up("lg")]: {
                            fontSize: "1.375rem",
                        },
                    },
                },
                breakpoints: {
                    values: {
                        xs: 0,
                        sm: 550,
                        md: 768,
                        lg: 992,
                        xl: 1920,
                    },
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        "input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill": {
                            backgroundColor: "#0000 !important",
                            WebkitBoxShadow: "0 0 0px 1000px #0000 inset",
                            WebkitTextFillColor: "#ffffff !important",
                        },
                    }}
                />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

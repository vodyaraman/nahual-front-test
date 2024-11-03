import React, { useMemo, useState, createContext, ReactNode } from 'react';
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

interface LayoutProps {
    children: ReactNode;
}

export default function StyleLayout({ children }: LayoutProps) {
    const [mode, setMode] = useState<PaletteMode>('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode('dark');
            },
        }),
        []
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
                        secondary: "#00000"
                    },
                    secondary: {
                        main: "#c29906",
                        contrastText: "#ffffff", 
                    },
                    primary: {
                        main: "#5c5439",
                        contrastText: "#ffffff",
                    }
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}


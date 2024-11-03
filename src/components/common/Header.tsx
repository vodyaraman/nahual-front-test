import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';
import { Box, Typography, Button } from "@mui/material";

export default function Header() {
    const [mode, setMode] = useState("default");
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const modeParam = searchParams?.get('mode');
        if (modeParam === 'register') {
            setMode("register");
        } else if (modeParam === 'login') {
            setMode("login");
        } else {
            setMode("default");
        }
    }, [searchParams]);

    // Функция для сброса состояния и перехода на режим "default"
    const resetAuthMode = () => {
        setMode("default");
        router.push('/'); // Переход на главную страницу без параметров
    };

    return (
        <Box
            component="header"
            sx={{
                zIndex: 10,
                display: "flex",
                position: "sticky",
                top: 0,
                flexDirection: "row",
                textAlign: "center",
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "#000",
                width: "100%",
                height: "60px",
            }}
        >
            <Box
                onClick={resetAuthMode}
                sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Image
                    src="./nahual-logo.svg"
                    alt=""
                    width={71}
                    height={71}
                    style={{
                        position: "relative",
                        top: "15px",
                        left: "5px",
                    }}
                    draggable="false"
                />
            </Box>
            <Typography
                variant="h1"
                sx={{
                    position: "relative",
                    fontSize: "1rem",
                    color: "#fff",
                    paddingLeft: "15px",
                    margin: 0,
                }}
            >
                Nuahual Visions
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: "10px",
                    marginLeft: "auto",
                    paddingRight: "15px",
                    fontSize: "0.7rem",
                }}
            >
                {mode === "default" && (
                    <>
                        <Link href="/auth/?mode=register" passHref>
                            <Button variant="contained" color="secondary" sx={{ color: "#000", fontSize: "inherit", padding: 1, borderRadius: "10px" }}>
                                Registration
                            </Button>
                        </Link>
                        <Link href="/auth/?mode=login" passHref>
                            <Button variant="outlined" color="secondary" sx={{ color: "#fff", fontSize: "inherit", padding: 1, borderRadius: "10px" }}>
                                Login
                            </Button>
                        </Link>
                    </>
                )}
                {mode === "login" && (
                    <Link href="/auth/?mode=register" passHref>
                        <Button variant="contained" color="secondary" sx={{ color: "#000", fontSize: "inherit", padding: 1, borderRadius: "10px" }}>
                            Registration
                        </Button>
                    </Link>
                )}
                {mode === "register" && (
                    <Link href="/auth/?mode=login" passHref>
                        <Button variant="outlined" color="secondary" sx={{ color: "#fff", fontSize: "inherit", padding: 1, borderRadius: "10px" }}>
                            Login
                        </Button>
                    </Link>
                )}
            </Box>
        </Box>
    );
}

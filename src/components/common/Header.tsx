'use client'
import React, { Suspense, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';
import { Box, Typography, Button } from "@mui/material";
import { RootState } from "@/state/store";
import { logout } from "@/state/auth/authSlice";

export default function Header() {
    const [mode, setMode] = useState("default");
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    // Получаем refreshToken из Redux
    const refreshToken = useSelector((state: RootState) => state.user.refreshToken);

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

    // Обработчик для выхода
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Box
                component="header"
                sx={{
                    zIndex: 10,
                    display: "flex",
                    position: "sticky",
                    top: 0,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "60px",
                }}>
                <Box
                    sx={{
                        zIndex: 10,
                        display: "flex",
                        position: "relative",
                        flexDirection: "row",
                        textAlign: "center",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        backgroundColor: "#160421df",
                        border: '3px solid #896F5C',
                        width: "88%",
                        height: "60px",
                    }}
                >
                    <Box
                        sx={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Link href="/" passHref>
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
                        </Link>
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
                        Nahual Visions
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
                        {refreshToken ? (
                            <>
                                <Link href="/profile" passHref>
                                    <Button variant="contained" color="secondary" sx={{ color: "#000", fontSize: "inherit", padding: 1, borderRadius: "10px" }}>
                                        Профиль
                                    </Button>
                                </Link>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{ color: "#fff", fontSize: "inherit", padding: 1, borderRadius: "10px" }}
                                    onClick={handleLogout}
                                >
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
                                {mode === "default" && (
                                    <>
                                        <Link href="/auth/?mode=register" passHref>
                                            <Button variant="contained" color="secondary" sx={{ color: "#000", fontSize: "inherit", padding: 1, borderRadius: "10px" }}>
                                                Регистрация
                                            </Button>
                                        </Link>
                                        <Link href="/auth/?mode=login" passHref>
                                            <Button variant="outlined" color="secondary" sx={{ color: "#fff", fontSize: "inherit", padding: 1, borderRadius: "10px" }}>
                                                Вход
                                            </Button>
                                        </Link>
                                    </>
                                )}
                                {mode === "login" && (
                                    <Link href="/auth/?mode=register" passHref>
                                        <Button variant="contained" color="secondary" sx={{ color: "#000", fontSize: "inherit", padding: 1, borderRadius: "10px" }}>
                                            Регистрация
                                        </Button>
                                    </Link>
                                )}
                                {mode === "register" && (
                                    <Link href="/auth/?mode=login" passHref>
                                        <Button variant="outlined" color="secondary" sx={{ color: "#fff", fontSize: "inherit", padding: 1, borderRadius: "10px" }}>
                                            Вход
                                        </Button>
                                    </Link>
                                )}
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Suspense>
    );
}

'use client'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import StyledButton from "../StyledButton";
import StyledTypography from "../StyledTypography";
import { RootState } from "@/state/store";
import { logout } from "@/state/auth/authSlice";
import "./Header.scss";
import { CircularProgress, Skeleton } from "@mui/material";

export default function Header() {
    const [mode, setMode] = useState<"default" | "register" | "login" | null>(null);
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const refreshToken = useSelector((state: RootState) => state.user.refreshToken);

    useEffect(() => {
        const modeParam = searchParams?.get("mode") as "register" | "login" | null;
        setMode(modeParam || "default");
    }, [searchParams]);

    const handleLogout = () => dispatch(logout());

    const renderAuthButtons = () => {
        if (refreshToken) {
            return (
                <>
                    <StyledButton variant="contained" color="secondary" href="/profile" sx={{ color: '#000' }}>
                        Профиль
                    </StyledButton>
                    <StyledButton variant="outlined" color="secondary" onClick={handleLogout}>
                        Выйти
                    </StyledButton>
                </>
            );
        }

        switch (mode) {
            case "default":
                return (
                    <>
                        <StyledButton variant="contained" color="primary" href="/auth/?mode=register">
                            Регистрация
                        </StyledButton>
                        <StyledButton variant="outlined" color="secondary" href="/auth/?mode=login">
                            Вход
                        </StyledButton>
                    </>
                );
            case "login":
                return (
                    <StyledButton variant="contained" color="primary" href="/auth/?mode=register">
                        Регистрация
                    </StyledButton>
                );
            case "register":
                return (
                    <StyledButton variant="outlined" color="secondary" href="/auth/?mode=login">
                        Вход
                    </StyledButton>
                );
            default:
                return null;
        }
    };

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo-wrapper">
                    <Link href="/" passHref>
                        {mode !== null ? (
                            <Image
                                src="/nahual-logo2.png"
                                alt="Nahual Visions Logo"
                                width={60}
                                height={55}
                                className="header__logo"
                                draggable="false"
                                style={{
                                    position: "relative",
                                    top: "5px",
                                    left: "5px",
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: "60px",
                                    height: "55px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <CircularProgress size={30} />
                            </div>
                        )}
                    </Link>
                </div>
                <StyledTypography className="header__title">Nahual Visions</StyledTypography>
                <div className="header__buttons">
                    {mode !== null ? (
                        renderAuthButtons()
                    ) : (
                        <Skeleton animation='pulse' variant="rectangular" width={200} height={40} sx={{ borderRadius: "10px" }} />
                    )}
                </div>
            </div>
        </header>
    );
}

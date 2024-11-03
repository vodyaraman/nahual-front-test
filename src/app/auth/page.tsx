/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // Импортируем useRouter
import { Box, Button, Typography } from '@mui/material';
import Header from '@/components/common/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import LoginForm from './Login';
import RegisterForm from './Registration';
import StyleLayout from '@/components/layouts/StyleLayout';

export default function Auth() {
    const [authMode, setAuthMode] = useState("none");
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const router = useRouter(); // Инициализируем useRouter
    const images = [
        '/auth1.png',
        '/auth2.png',
        '/auth3.png'
    ];

    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'register') {
            setAuthMode("register");
        } else if (mode === 'login') {
            setAuthMode("login");
        } else {
            setAuthMode("none");
        }

        setIsLoading(false);
    }, [searchParams]);

    const handleAuthModeChange = (mode:string) => {
        router.push(`?mode=${mode}`);
        setAuthMode(mode);
    };

    const toggleAuthMode = () => {
        const newMode = authMode === "login" ? "register" : "login";
        router.push(`?mode=${newMode}`);
        setAuthMode(newMode);
    };

    return (
        <StyleLayout>
            <Header />
            <Box
                sx={{
                    display: 'flex',
                    minHeight: '100vh',
                    width: '100%',
                    backgroundColor: 'background.default',
                    color: 'text.primary',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: '50%',
                        boxSizing: 'border-box',
                        padding: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: 400,
                            width: '100%',
                            borderRadius: 2,
                            boxShadow: 3,
                            mt: 6,
                            backgroundColor: 'background.default',
                            color: 'text.primary',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Typography variant="h5" component="h1">
                                {authMode === "login" ? 'Login' : authMode === "register" ? 'Register' : 'Вас нет в нашей системе'}
                            </Typography>

                            {authMode === "login" && <LoginForm />}
                            {authMode === "register" && <RegisterForm />}

                            {authMode === "none" && (
                                <>
                                    <Typography sx={{ mt: 2, fontSize: '0.8rem' }}>
                                        Пожалуйста, выберите один из вариантов ниже:
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleAuthModeChange("login")} // Добавляем параметр в URL
                                        disabled={isLoading}
                                        sx={{ mt: 2, color: 'text.primary', fontSize: '0.75rem' }}
                                    >
                                        Войти
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleAuthModeChange("register")} // Добавляем параметр в URL
                                        disabled={isLoading}
                                        sx={{ mt: 2, color: 'text.primary', fontSize: '0.75rem' }}
                                    >
                                        Зарегистрироваться
                                    </Button>
                                </>
                            )}

                            {(authMode === "login" || authMode === "register") && (
                                <Button
                                    onClick={toggleAuthMode}
                                    sx={{ mt: 2, color: 'text.primary', fontSize: '0.6rem' }}
                                >
                                    {authMode === "login" ? "Don't have an account? Register" : "Already have an account? Login"}
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                    }}
                >
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{
                            delay: 10000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        loop={true}
                        style={{ width: '100%', height: '100%' }}
                    >
                        {images.map((src, index) => (
                            <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    src={src}
                                    alt={`Image ${index + 1}`}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Box>
        </StyleLayout>
    );
}

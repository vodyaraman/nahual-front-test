/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
    const [isLogin, setIsLogin] = useState(true);
    const searchParams = useSearchParams();
    const images = [
        'https://kapital-rus.ru/img/articles/289926.jpg',
        'https://s9.travelask.ru/uploads/post/000/031/320/main_image/full-c498e681ad79e90f6b3ec2cb28f3328e.jpg',
        'https://naked-science.ru/wp-content/uploads/2016/08/field_image_0_554351_bf4d1b86_orig.jpg'
    ];

    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'register') {
            setIsLogin(false);
        } else if (mode === 'login') {
            setIsLogin(true);
        }
    }, [searchParams]);

    const toggleAuthMode = () => {
        setIsLogin((prevIsLogin) => !prevIsLogin);
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
                                {isLogin ? 'Login' : 'Register'}
                            </Typography>
                            {isLogin ? <LoginForm /> : <RegisterForm />}
                            <Button
                                onClick={toggleAuthMode}
                                sx={{ mt: 2, color: 'text.primary', fontSize: '0.6rem' }}
                            >
                                {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                            </Button>
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

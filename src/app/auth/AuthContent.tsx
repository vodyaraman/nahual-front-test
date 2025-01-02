'use client';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Skeleton, Box } from '@mui/material';
import StyledButton from '@/components/common/StyledButton';

// Ленивый импорт компонентов для логина и регистрации
const LoginForm = lazy(() => import('./login/Login'));
const RegisterForm = lazy(() => import('./registration/Registration'));
const OAuthButtons = lazy(() => import('./oAuth/OAuth'))

export default function AuthContent() {
    const [authMode, setAuthMode] = useState<'login' | 'register' | 'none'>('none');
    const [isAuthModeLoading, setIsAuthModeLoading] = useState(true); // Состояние загрузки authMode
    const searchParams = useSearchParams();
    const router = useRouter();

    // Обновление состояния `authMode` на основе параметров URL
    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode === 'register') {
            setAuthMode('register');
        } else if (mode === 'login') {
            setAuthMode('login');
        } else {
            setAuthMode('none');
        }

        // Завершаем загрузку authMode
        setIsAuthModeLoading(false);
    }, [searchParams]);

    // Функция переключения между режимами
    const toggleAuthMode = () => {
        const newMode = authMode === 'login' ? 'register' : 'login';
        router.push(`?mode=${newMode}`);
        setAuthMode(newMode);
    };

    const Fallback = () => {
        return (
            <>
                <Box className="auth-form-skeleton">
                    <Skeleton variant="text" width="60%" height={40} sx={{ margin: '10px auto' }} />
                    <Skeleton variant="text" width="90%" height={40} sx={{ margin: '10px auto' }} />
                    <Skeleton variant="text" width="90%" height={40} sx={{ margin: '10px auto' }} />
                    <Skeleton variant="rectangular" width="90%" height={40} sx={{ margin: '10px auto' }} />
                </Box>
                <Box className="auth-aside-skeleton">
                    <Skeleton variant="rectangular" width="90%" height={40} sx={{ margin: '10px auto' }} />
                    <Skeleton variant="text" width="90%" height={40} sx={{ margin: '10px auto' }} />
                    <Skeleton variant="rectangular" width="90%" height={40} sx={{ margin: '10px auto' }} />
                </Box>
            </>

        )
    }

    return (
        <section className="auth-content">
            {isAuthModeLoading && <Fallback />}
            <Suspense
                fallback={
                    <>
                        <Fallback />
                    </>
                }
            >
                {authMode === 'login' && <LoginForm />}
                {authMode === 'register' && <RegisterForm />}

                {!isAuthModeLoading &&
                    <aside className='auth-aside'>
                        {(authMode === 'login' || authMode === 'register') && (
                            <StyledButton
                                variant='contained'
                                color='secondary'
                                onClick={toggleAuthMode}
                                sx={{ color: '#000' }}>
                                {authMode === 'login'
                                    ? 'У вас нет аккаунта? Зарегистрироваться'
                                    : 'Уже есть аккаунт? Войти'}
                            </StyledButton>
                        )}

                        <OAuthButtons />
                    </aside>}
            </Suspense>
        </section>
    );
}

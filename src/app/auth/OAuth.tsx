import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Stack, Typography, CircularProgress } from '@mui/material';

interface OAuthButtonProps {
    platform: 'vk' | 'yandex' | 'gosuslugi' | 'telegram';
    onClick: () => void;
}

const platformIcons = {
    vk: '/auth-vk.svg',
    yandex: '/auth-yandex.svg',
    gosuslugi: '/auth-gosuslugi.svg',
    telegram: '/auth-telegram.svg'
};

const platformLabels = {
    vk: 'ВКонтакте',
    yandex: 'Яндекс',
    gosuslugi: 'Госуслуги',
    telegram: 'Telegram'
};

const OAuthButton: React.FC<OAuthButtonProps> = ({ platform, onClick }) => (
    <Button
        onClick={onClick}
        aria-label={`Login with ${platformLabels[platform]}`}
        variant="contained"
        sx={{ minWidth: 0, padding: 0, borderRadius: '50%', width: 32, height: 32 }}
    >
        <Image 
            src={platformIcons[platform]} 
            alt={`${platformLabels[platform]} icon`} 
            width={32} 
            height={32} 
        />
    </Button>
);

const OAuthButtons: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleOAuthLogin = async (provider: 'vk' | 'yandex' | 'gosuslugi' | 'telegram') => {
        setIsLoading(true);
        setError(null);
        try {
            // Эмуляция асинхронного вызова
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (provider === 'gosuslugi') {
                        reject('Provider not available'); // Искусственная ошибка для теста
                    } else {
                        resolve({ provider, token: 'dummy_token' });
                    }
                }, 1000); // Эмуляция задержки
            });
            console.log('OAuth response:', { provider, token: 'dummy_token' });
        } catch (err) {
            setError(`Ошибка авторизации: ${err}`);
            console.error('OAuth login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Stack spacing={2} alignItems="center">
            <Typography variant="body2" color="textSecondary">
                or use
            </Typography>
            {isLoading ? (
                <CircularProgress color="secondary" />
            ) : (
                <Stack direction="row" spacing={2}>
                    <OAuthButton platform="vk" onClick={() => handleOAuthLogin('vk')} />
                    <OAuthButton platform="yandex" onClick={() => handleOAuthLogin('yandex')} />
                    <OAuthButton platform="gosuslugi" onClick={() => handleOAuthLogin('gosuslugi')} />
                    <OAuthButton platform="telegram" onClick={() => handleOAuthLogin('telegram')} />
                </Stack>
            )}
            {error && <Typography color="error">{error}</Typography>}
        </Stack>
    );
};

export default OAuthButtons;

import React from 'react';
import Image from 'next/image';
import { Button, Stack, Typography, CircularProgress } from '@mui/material';
import { useInitiateOAuthMutation } from '@/state/oAuth/oAuthApi';

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
    const [initiateOAuth, { isLoading, error }] = useInitiateOAuthMutation();

    const handleOAuthLogin = async (provider: 'vk' | 'yandex' | 'gosuslugi' | 'telegram') => {
        try {
            const response = await initiateOAuth({ provider }).unwrap();
            console.log('OAuth response:', response);
        } catch (err) {
            console.error('OAuth login error:', err);
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
            {error && <Typography color="error">Ошибка авторизации</Typography>}
        </Stack>
    );
};

export default OAuthButtons;


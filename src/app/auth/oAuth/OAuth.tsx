'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface OAuthButtonProps {
    platform: 'vk' | 'yandex' | 'gosuslugi' | 'telegram';
    onClick: () => void;
}

const platformIcons = {
    vk: '/auth-vk.svg',
    yandex: '/auth-yandex.svg',
    gosuslugi: '/auth-gosuslugi.svg',
    telegram: '/auth-telegram.svg',
};

const platformLabels = {
    vk: 'ВКонтакте',
    yandex: 'Яндекс',
    gosuslugi: 'Госуслуги',
    telegram: 'Telegram',
};

const OAuthButton: React.FC<OAuthButtonProps> = ({ platform, onClick }) => (
    <button
        onClick={onClick}
        aria-label={`Login with ${platformLabels[platform]}`}
        className="oauth-button"
    >
        <Image 
            src={platformIcons[platform]} 
            alt={`${platformLabels[platform]} icon`} 
            width={32} 
            height={32} 
        />
    </button>
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
        <>
            <p className="oauth-text">или используйте</p>
            {isLoading ? (
                <div className="oauth-loading">Loading...</div>
            ) : (
                <div className="oauth-buttons">
                    <OAuthButton platform="vk" onClick={() => handleOAuthLogin('vk')} />
                    <OAuthButton platform="yandex" onClick={() => handleOAuthLogin('yandex')} />
                    <OAuthButton platform="gosuslugi" onClick={() => handleOAuthLogin('gosuslugi')} />
                    <OAuthButton platform="telegram" onClick={() => handleOAuthLogin('telegram')} />
                </div>
            )}
            {error && <p className="oauth-error">{error}</p>}
        </>
    );
};

export default OAuthButtons;

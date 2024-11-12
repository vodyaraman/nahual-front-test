'use client'
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Avatar, Input } from '@mui/material';

const ProfileSettings = () => {
    const [username, setUsername] = useState('Иван Иванов');
    const [email, setEmail] = useState('ivan@example.com');
    const [avatarUrl, setAvatarUrl] = useState('/default-avatar.png');


    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const newAvatarUrl = URL.createObjectURL(event.target.files[0]);
            setAvatarUrl(newAvatarUrl);
        }
    };

    const handleSave = () => {
        console.log('Изменения сохранены:', { username, email, avatarUrl });
    };

    return (
        <Paper sx={{ padding: '10px 20px', width: 'auto', backgroundColor: '#000000ad', overflowY: 'visible' }}>
            <Typography variant="h6" gutterBottom>
                Настройки профиля
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: 2, gap: 2, maxWidth: '500px'}}>
                <Avatar src={avatarUrl} sx={{ width: 100, height: 100 }} />
                <Input
                    type="file"
                    inputProps={{ accept: 'image/*' }}
                    onChange={handleAvatarChange}
                />
                <Button variant="contained" color="primary" onClick={handleSave} sx={{
                    width: "200px",
                    fontSize: '0.7rem',
                }}>
                    Сохранить аватар
                </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 5, maxWidth: '500px' }}>
                <TextField
                    label="Имя пользователя"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <TextField
                    label="Электронная почта"
                    value={email}
                    onChange={handleEmailChange}
                />
                <Button variant="contained" color="primary" onClick={handleSave} sx={{
                    width: "200px",
                    fontSize: '0.7rem',
                }}>
                    Сохранить изменения
                </Button>
            </Box>

            <Box sx={{ marginTop: 5, gap: 2, maxWidth: '500px'}}>
                <Typography variant="body1" gutterBottom>
                    Здесь будет информация об оплате тарифов и возможность управлять подписками.
                </Typography>
                <Button variant="contained" color="primary" sx={{
                    width: "200px",
                    fontSize: '0.7rem',
                }}>
                    Перейти к оплате
                </Button>
            </Box>
        </Paper>
    );
};

export default ProfileSettings;

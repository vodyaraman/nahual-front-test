'use client'
import React, { memo, useState } from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import StateLayout from '@/components/layouts/StateLayout';
import StyleLayout from '@/components/layouts/StyleLayout';
import Header from '@/components/common/Header';
import Background from '@/components/common/Background';

const ProfilePage = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // Данные пользователя (замените на реальные данные)
    const user = {
        username: 'Иван Иванов',
        email: 'ivan@example.com',
        avatarUrl: 'https://example.com/avatar.png',
    };

    interface TabPanelProps {
        children?: React.ReactNode;
        value: number;
        index: number;
    }

    const TabPanel: React.FC<TabPanelProps> = memo(({ children, value, index, ...other }) => (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Background />
            {value === index && (
                <Box sx={{ p: 3, color: 'currentColor' }}>
                    {children}
                </Box>
            )}
        </div>
    ));

    TabPanel.displayName = 'TabPanel';

    return (
        <StateLayout>
            <StyleLayout>
                <Header />
                <Box sx={{
                    width: '100%',
                    height: '80px',
                    top: '60px'
                }}>
                    <Box sx={{
                        width: '100%',
                        backgroundColor: '#000',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '100%',
                        paddingLeft: '5rem',
                    }}>
                        <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
                            <Tab label="История активностей" value={0} sx={{
                                color: 'gray',
                                '&.Mui-selected': {
                                    color: 'gold',
                                },
                            }} />
                            <Tab label="Настройки" value={1} sx={{
                                color: 'gray',
                                '&.Mui-selected': {
                                    color: 'gold',
                                },
                            }} />
                            <Tab label="Помощь" value={2} sx={{
                                color: 'gray',
                                '&.Mui-selected': {
                                    color: 'gold',
                                },
                            }} />
                        </Tabs>
                        <Box sx={{
                            padding: '1rem',
                        }}>
                            <Typography variant="body1" color="white" textAlign={"right"}>
                                {user.username}
                            </Typography>
                            <Typography variant="body2" color="grey" textAlign={"right"}>
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Typography>Здесь будет отображаться история ваших предсказаний.</Typography>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Typography>Здесь вы можете изменить свои настройки.</Typography>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Typography>Здесь вы найдете ответы на часто задаваемые вопросы.</Typography>
                    </TabPanel>
                </Box>
            </StyleLayout>
        </StateLayout>
    );
};

export default ProfilePage;
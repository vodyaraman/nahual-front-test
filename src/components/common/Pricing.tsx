import React from 'react';
import { Container, Typography, Card, CardContent, Button, List, ListItem, Box } from '@mui/material';
import Image from 'next/image';

const pricingPlans = [
    {
        title: 'Шаман',
        features: ['Три предсказания в неделю'],
        price: '299₽',
    },
    {
        title: 'Провидец',
        features: ['Пять предсказаний в неделю'],
        price: '499₽',
    },
    {
        title: 'Нагуаль',
        features: ['Семь предсказаний в неделю'],
        price: '899₽',
    },
];

const Pricing = () => {
    return (
        <Container
            disableGutters
            sx={{
                display: 'flex',
                position: 'relative',
                alignItems: 'flex-start',
                width: '100%',
                paddingBottom: '20px',
                paddingTop: '30px',
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    width: '100%',
                    '@media (max-width: 768px)': {
                        gridTemplateColumns: '1fr',
                        justifyItems: 'center',
                    },
                }}
            >
                {pricingPlans.map((plan, index) => (
                    <Box
                        key={index}
                        sx={{
                            perspective: '1000px',
                            '&:hover .cardInner': {
                                transform: 'rotateY(180deg) translateY(-20px) translateX(-10px)',
                            },
                            '@media (max-width: 768px)': {
                                transform: 'rotate(90deg)',
                                '&:hover .cardInner': {
                                    transform: 'rotateY(180deg) translateY(0px) rotate(90deg)', // Возврат к вертикальному положению при перевороте
                                },
                            },
                        }}
                    >
                        <Image
                            src="/cardback.png"
                            width={500}
                            height={600}
                            alt=""
                            style={{
                                position: 'fixed',
                                width: '100%',
                                height: '100%',
                                objectFit: 'fill',
                                left: '0px',
                            }}
                        />
                        <Box
                            className="cardInner"
                            sx={{
                                transformStyle: 'preserve-3d',
                                transition: 'transform 0.6s',
                                position: 'relative',
                                width: '12rem',
                                '@media (max-width: 768px)': {
                                    width: '9.5rem',
                                    height: '14.5rem',
                                },
                            }}
                        >
                            {/* Front Side */}
                            <Card
                                sx={{
                                    backfaceVisibility: 'hidden',
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '15px',
                                }}
                            >
                                <Image
                                    src="/cardback.png"
                                    width={500}
                                    height={600}
                                    alt=""
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'fill',
                                    }}
                                />
                            </Card>

                            {/* Back Side */}
                            <Card
                                sx={{
                                    transform: 'rotateY(180deg)',
                                    backfaceVisibility: 'hidden',
                                    position: 'relative',
                                    width: '100%',
                                    height: '18rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    borderRadius: '15px',
                                    border: '1px double #bababa',
                                    padding: '15px',
                                    background: 'linear-gradient(to top, #000000 20%, #000000 100%)',
                                    '@media (max-width: 768px)': {
                                        width: '9.5rem',
                                        height: '14.5rem',
                                    },
                                }}
                            >
                                <CardContent sx={{ padding: 0 }}>
                                    <Typography variant="h6" component="h4">
                                        {plan.title}
                                    </Typography>
                                    <List>
                                        {plan.features.map((feature, i) => (
                                            <ListItem key={i} sx={{ margin: '10px 0', textAlign: 'left', color: '#bfbfbf' }}>
                                                {feature}
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{
                                        marginTop: 'auto',
                                        fontSize: '1.2rem',
                                        color: '#dadada',
                                        backgroundColor: '#000000',
                                        border: '1px solid #000000',
                                        borderRadius: '50px',
                                        '&:hover': {
                                            scale: '1.1',
                                        },
                                    }}
                                >
                                    {plan.price}
                                </Button>
                            </Card>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default Pricing;

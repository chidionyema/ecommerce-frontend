'use client';
import React from 'react';
import {
    Box,
    Container,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    useTheme,
    alpha,
    Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { CheckCircle } from 'react-feather';
import { ProjectCardBackground } from '../../theme/themes';
import Link from 'next/link';

export const WhyPartner = () => {
    const theme = useTheme();

    const reasons = [
        "Expert Consultation",
        "Innovative Solutions",
        "Reliable Execution",
        "Scalable Growth"
    ];

    return (
        <ProjectCardBackground sx={{ py: { xs: 10, md: 12 } }}>
            <Container maxWidth="md">
                <Typography
                    variant="h2"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 900,
                        mb: 4,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Why Choose Us?
                </Typography>

                <List sx={{ mx: 'auto', width: '100%', maxWidth: 500 }}>
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.3, ease: 'easeInOut' }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <ListItem sx={{ py: 1.5 }}>
                                <ListItemIcon>
                                    <CheckCircle
                                        size={24}
                                        color={theme.palette.primary.light}
                                        strokeWidth={2}
                                    />
                                </ListItemIcon>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                    }}
                                >
                                    {reason}
                                </Typography>
                            </ListItem>
                        </motion.div>
                    ))}
                </List>

                {/* Call to Action */}
                <Box sx={{ textAlign: 'center', mt: 6 }}> {/* Added margin-top */}
                    <Link href="/contact" passHref legacyBehavior>
                        <Button
                            component={motion.button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            variant="contained"
                            size="large"
                            sx={{
                                background: `linear-gradient(135deg, 
                          ${theme.palette.primary.main} 0%, 
                          ${theme.palette.secondary.main} 100%
                        )`,
                                color: theme.palette.common.white,
                                px: 6,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 700,
                                borderRadius: '16px',
                                boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
                                '&:hover': {
                                    boxShadow: `0 16px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
                                },
                            }}
                        >
                            Contact Us
                        </Button>
                    </Link>
                </Box>
            </Container>
        </ProjectCardBackground>
    );
};
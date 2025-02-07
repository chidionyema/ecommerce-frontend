'use client'; // nargin appled 'use client';

import React from 'react';
import {
    Box,
    Typography,
    CardContent,
    Button,
    useTheme,
    alpha,
} from '@mui/material';
import NextLink from 'next/link';
import { ArrowRightAlt } from '@mui/icons-material';
import GoldCard from '../GoldCard';
import { CARD_SIZES, SPACING } from '../../utils/sharedStyles';
import { DesignServices } from '@mui/icons-material'; // Default Icon

interface Project {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    clientName?: string;
    gradient?: string;
    highlights?: string; // Keeping 'highlights' in data, but using 'achievements' in UI
    imageUrl?: string;
    icon?: React.ComponentType;
}

const ProjectCard = ({ project, sx }: { project: Project; sx?: any }) => {
    const theme = useTheme();
    const { width: CARD_WIDTH, height: CARD_HEIGHT } = CARD_SIZES.large;
    const truncatedDescription = project.description.substring(0, 100) + (project.description.length > 100 ? '...' : '');
    const DefaultIcon = DesignServices;

    return (
        <Box
            sx={{
                m: SPACING.medium,
                mx: 'auto',
                width: 332,
            }}
        >
            <GoldCard
                href={`/projects/${project.id}`}
                className="gold-card" // Added class for ripple effect
                sx={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: CARD_HEIGHT,
                    display: 'flex',
                    flexDirection: 'column',
                    p: SPACING.medium,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, background 0.3s ease', // Transition for background too
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 70%, ${alpha(theme.palette.primary.light, 0.15)} 100%)`, // Hover gradient
                    },
                    ...sx,
                }}
            >
                {/* Enhanced Header Section: Image or Icon with Aspect Ratio and Border */}
                <Box
                    sx={{
                        height: 140,
                        width: '100%',
                        borderRadius: 1,
                        overflow: 'hidden',
                        position: 'relative',
                        bgcolor: 'background.paper',
                        mb: SPACING.medium,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: '16/9', // Consistent aspect ratio
                        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`, // Subtle border
                    }}
                >
                    {project.imageUrl ? (
                        <Box
                            component="img"
                            src={project.imageUrl}
                            alt={project.name}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    ) : project.icon ? (
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                           <Box sx={{ fontSize: 70, color: theme.palette.primary.main }}> {/* Wrap the icon with Box */}
                                <project.icon />
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                background: project.gradient || theme.palette.background.default,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <DefaultIcon sx={{ fontSize: 70, color: theme.palette.primary.main }} />
                        </Box>
                    )}
                </Box>

                {/* Card Content */}
                <CardContent
                    sx={{
                        px: 0,
                        pb: 0,
                        height: `calc(100% - 140px - ${SPACING.medium}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                    }}
                >
                    {/* Title Section */}
                    <Box sx={{ mb: SPACING.small, minHeight: 60, overflow: 'hidden' }}>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{
                                fontWeight: 700,
                                lineHeight: 1.3,
                                whiteSpace: 'normal',
                            }}
                        >
                            {project.name}
                        </Typography>
                        {project.clientName && (
                            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
                                {project.clientName}
                            </Typography>
                        )}
                    </Box>

                    {/* Technologies Section */}
                    {project.technologies && project.technologies.length > 0 && (
                        <Box sx={{ mb: SPACING.medium }}>
                            <Typography variant="caption" fontWeight={600} color="text.primary" sx={{ display: 'block', mb: 0.5 }}>
                                Technologies:
                            </Typography>
                            <Typography variant="body2" color="text.primary" fontWeight={500}>
                                {project.technologies.slice(0, 3).join(', ')}
                                {project.technologies.length > 3 && '...'}
                            </Typography>
                        </Box>
                    )}

                    {/* Achievements Section (using 'highlights' data) */}
                    {project.highlights && (
                        <Box sx={{ mb: SPACING.medium }}>
                            <Typography variant="caption" fontWeight={600} color="text.primary" sx={{ display: 'block', mb: 0.5 }}>
                                Achievements:
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                “{project.highlights}” {/* Displaying 'highlights' data as 'Achievements' in UI */}
                            </Typography>
                        </Box>
                    )}

                    {/* Description Section */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            pr: 1,
                            mb: SPACING.medium,
                            '&::-webkit-scrollbar': { width: 6 },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.3),
                                borderRadius: 3,
                            },
                        }}
                    >
                        <Typography variant="body2">
                            {truncatedDescription}
                        </Typography>
                    </Box>

                    {/* Sticky Bottom Button with Hover Animation */}
                    <Box
                        sx={{
                            pt: SPACING.small,
                            position: 'sticky',
                            bottom: 0,
                            bgcolor: 'background.default',
                            zIndex: 1,
                        }}
                    >
                        <Button
                            component={NextLink}
                            href={`/projects/${project.id}`}
                            fullWidth
                            endIcon={<ArrowRightAlt />}
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                                py: 1,
                                fontWeight: 600,
                                borderRadius: 2,
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                    transform: 'scale(1.03)', // Button hover animation
                                    transition: 'transform 0.2s ease-in-out',
                                },
                            }}
                        >
                            Learn More
                        </Button>
                    </Box>
                </CardContent>
            </GoldCard>
        </Box>
    );
};

export default ProjectCard;
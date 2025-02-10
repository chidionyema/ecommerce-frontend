import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CardContent,
  Button,
  useTheme,
  alpha,
  keyframes,
} from '@mui/material';
import NextLink from 'next/link';
import { ArrowRightAlt } from '@mui/icons-material';
import GoldCard from '../GoldCard';
import { CARD_SIZES, SPACING } from '../../utils/sharedStyles';
import { technologyIconMap } from '../../data/cvProjects';
import { Code } from 'lucide-react';

const shineAnimation = keyframes`
  0% { left: -50%; }
  100% { left: 150%; }
`;

interface Project {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType | null;
  iconColor?: string;
  clientName: string;
  metrics: { value: string; label: string }[];
  technologies: string[];
}

const ProjectCard: React.FC<{ project: Project; sx?: any }> = ({ project, sx }) => {
  const theme = useTheme();
  const { width: CARD_WIDTH, height: CARD_HEIGHT } = CARD_SIZES.xlarge;
  // Ensure a description exists
  const fullDescription = project.description || 'No description available';
  const truncatedDescription =
    fullDescription.length > 100
      ? fullDescription.substring(0, 100) + '...'
      : fullDescription;
  const DefaultIcon = Code;
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = '/images/istockphoto-todo.jpg';

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, [imageUrl]);

  return (
    <Box sx={{ m: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        sx={{
          m: 1,
          width: CARD_WIDTH,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <GoldCard
          href={`/projects/${project.id}`}
          sx={{
            width: '100%',
            height: CARD_HEIGHT,
            p: 2,
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                width: '200%',
                height: '200%',
                background: `linear-gradient(45deg, transparent, ${alpha(
                  theme.palette.common.white,
                  0.2
                )}, transparent)`,
                transform: 'rotate(30deg)',
                animation: `${shineAnimation} 1.5s forwards`,
              },
            },
            m: 2, // Consistent outer margin for every card
            ...sx,
          }}
        >
          {/* Header Section with Image */}
          <Box
            sx={{
              height: '35%',
              width: '100%',
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
              mb: SPACING.medium,
            }}
          >
            {imageLoaded && (
              <Box
                component="img"
                src={imageUrl}
                alt={project.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 0,
                }}
              />
            )}

            {/* Client Name & Icon */}
            <Box
              sx={{
                position: 'absolute',
                bottom: SPACING.small,
                left: SPACING.small,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                backgroundColor: alpha(theme.palette.background.paper, 0.7),
                px: 2,
                py: 1,
                borderRadius: 4,
                boxShadow: theme.shadows[2],
                zIndex: 1,
              }}
            >
              {project.icon ? (
                <project.icon
                  size={24}
                  color={project.iconColor || theme.palette.primary.main}
                />
              ) : (
                <DefaultIcon size={24} color={theme.palette.primary.main} />
              )}
              <Typography variant="body2" fontWeight={700}>
                {project.clientName}
              </Typography>
            </Box>
          </Box>

          {/* Card Content */}
          <CardContent
            sx={{
              px: 2,
              pb: 2,
              height: '65%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Title & Metrics */}
            <Box sx={{ mb: SPACING.small }}>
              <Typography
                variant="h5"
                component="h2"
                fontWeight={800}
                gutterBottom
                sx={{ fontSize: '2rem' }}
              >
                {project.name}
              </Typography>
              {project.metrics && (
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  {project.metrics.slice(0, 3).map((metric, index) => (
                    <Box key={index} sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary.main" fontWeight={700}>
                        {metric.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {metric.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            {/* Technologies */}
            {project.technologies && (
              <Box sx={{ mb: SPACING.medium }}>
                <Typography variant="caption" fontWeight={700} display="block" mb={1}>
                  Core Technologies
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {project.technologies.slice(0, 5).map((tech: string, index: number) => {
                    const techData = technologyIconMap[tech as keyof typeof technologyIconMap];
                    const IconComponent = techData?.icon || DefaultIcon;
                    return (
                      <Box
                        key={index}
                        sx={{
                          p: 1,
                          bgcolor: alpha(techData?.color || theme.palette.primary.main, 0.1),
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        <IconComponent
                          size={20}
                          color={techData?.color || theme.palette.primary.main}
                        />
                        <Typography variant="caption" color="textPrimary">
                          {tech}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}

            {/* Description */}
            <Box
              sx={{
                minHeight: 80, // Ensures a consistent space for the description
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
              <Typography variant="body2">{truncatedDescription}</Typography>
            </Box>

            {/* Button Section - ONLY this part is changed */}
            <Box
              sx={{
                position: 'absolute',
                bottom: SPACING.medium,
                left: SPACING.medium,
                right: SPACING.medium,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                component={NextLink}
                href={`/projects/${project.id}`}
                endIcon={<ArrowRightAlt />}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  py: SPACING.small,
                  px: SPACING.medium,
                  fontWeight: 700,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'scale(1.03)',
                  },
                }}
              >
                Explore Case Study
              </Button>
            </Box>
          </CardContent>
        </GoldCard>
      </Box>
    </Box>
  );
};

export default ProjectCard;

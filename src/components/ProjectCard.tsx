import React, { memo } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { styled, alpha } from "@mui/system";
import { Box, Typography, Chip, Tooltip } from "@mui/material";
import {
  PRIMARY_DARK,
  SECONDARY_DARK,
  ACCENT_GRADIENT,
  NEUTRAL_LIGHT,
  SUCCESS_COLOR,
  TITLE_GRADIENT,
  HIGHLIGHT_COLOR,
  colors,
} from "../theme/branding";

const CardContainer = styled(Box)(({ theme }) => ({
  borderRadius: "20px",
  height: "100%",
  minHeight: "420px",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  background: `
    linear-gradient(145deg, 
      ${alpha(PRIMARY_DARK, 0.95)} 0%, 
      ${alpha(SECONDARY_DARK, 0.95)} 100%)
  `,
  boxShadow: `
    0 12px 24px ${alpha(PRIMARY_DARK, 0.3)},
    inset 0 0 0 1px ${alpha(NEUTRAL_LIGHT, 0.1)}
  `,
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `
      0 16px 32px ${alpha(PRIMARY_DARK, 0.4)},
      inset 0 0 0 1px ${alpha(NEUTRAL_LIGHT, 0.2)}
    `,
    "&::after": {
      opacity: 1,
    }
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: ACCENT_GRADIENT,
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: -1,
  },
}));

const ContentContainer = styled(Box)({
  padding: "24px",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  position: "relative",
  zIndex: 2,
});

const ProjectHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  borderRadius: "12px",
  background: alpha(colors.NEUTRAL_LIGHT, 0.05),
  backdropFilter: "blur(8px)",
});

const ProjectName = styled(Typography)({
  fontWeight: 800,
  lineHeight: 1.2,
  background: TITLE_GRADIENT,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
});

const OutcomeBadge = styled(Box)({
  position: "absolute",
  top: "16px",
  right: "16px",
  padding: "6px 12px",
  borderRadius: "8px",
  background: SUCCESS_COLOR,
  color: PRIMARY_DARK,
  fontSize: "0.9rem",
  fontWeight: 700,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
});

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    outcome?: string;
    description: string;
    clientName: string;
    icon?: React.ElementType;
    technologies: string[];
    technologyIcons?: React.ElementType[];
  };
  index: number;
}

const ProjectCard = memo(({ project, index }: ProjectCardProps) => {
  const router = useRouter();
  const animationDelay = Math.min(index * 0.05, 0.3);

  const handleNavigation = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay, duration: 0.3 }}
      style={{ height: "100%" }}
    >
      <CardContainer onClick={handleNavigation}>
        {project.outcome && (
          <OutcomeBadge>
            ▲ {project.outcome}
          </OutcomeBadge>
        )}

        <ContentContainer>
          <ProjectHeader>
            {project.icon && (
              <project.icon style={{
                fontSize: "2.4rem",
                color: HIGHLIGHT_COLOR,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
              }} />
            )}
            <Typography variant="h6" sx={{
              color: NEUTRAL_LIGHT,
              fontWeight: 600,
              letterSpacing: "0.5px"
            }}>
              {project.clientName}
            </Typography>
          </ProjectHeader>

          <ProjectName variant="h3">
            {project.name}
          </ProjectName>

          <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
            gap: "1rem",
            padding: "1rem 0"
          }}>
            {project.technologyIcons?.map((Icon, index) => (
              <Tooltip key={index} title={project.technologies[index]}>
                <Box sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "12px",
                  borderRadius: "8px",
                  background: alpha(NEUTRAL_LIGHT, 0.05),
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: alpha(HIGHLIGHT_COLOR, 0.1),
                    transform: "scale(1.1)"
                  }
                }}>
                  <Icon style={{
                    fontSize: "2.2rem",
                    color: HIGHLIGHT_COLOR
                  }} />
                </Box>
              </Tooltip>
            ))}
          </Box>

          <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "auto",
            justifyContent: "center"
          }}>
            {project.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="medium"
                sx={{
                  backgroundColor: alpha(HIGHLIGHT_COLOR, 0.15),
                  color: HIGHLIGHT_COLOR,
                  fontWeight: 600,
                  borderRadius: "8px",
                  border: `1px solid ${alpha(HIGHLIGHT_COLOR, 0.3)}`,
                  "&:hover": {
                    backgroundColor: alpha(HIGHLIGHT_COLOR, 0.25)
                  }
                }}
              />
            ))}
          </Box>
        </ContentContainer>
      </CardContainer>
    </motion.div>
  );
});

export default ProjectCard;
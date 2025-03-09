import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ProjectCard, { Project } from './ProjectCard';

// Types
export interface ProjectGridProps {
  projects: Project[];
  spacing?: number;
  animate?: boolean;
  columnCount?: { 
    xs?: number; 
    sm?: number; 
    md?: number; 
    lg?: number;
  };
}

// Grid Component
const ProjectGrid = ({
  projects,
  spacing = 4,
  animate = true,
  columnCount = { xs: 1, sm: 2, md: 3, lg: 3 }
}: ProjectGridProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    window.location.href = `/projects/${id}`;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: `repeat(${columnCount.xs || 1}, 1fr)`,
          sm: `repeat(${columnCount.sm || 2}, 1fr)`,
          md: `repeat(${columnCount.md || 3}, 1fr)`,
          lg: `repeat(${columnCount.lg || 3}, 1fr)`,
        },
        gap: spacing,
        width: '100%',
        my: 4,
        justifyItems: 'center',
      }}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          delay={animate ? index : 0}
          priority={index < 3}
          onSelect={handleSelect}
        />
      ))}
    </Box>
  );
};

export default ProjectGrid;
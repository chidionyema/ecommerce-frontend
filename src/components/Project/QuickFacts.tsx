// components/Project/QuickFacts.tsx
import React from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import { Timeline, People, Code, Work } from '@mui/icons-material';

interface QuickFactsProps {
  teamSize: number;  // Fixed type to number
  timeline: string;
  technologies: string[];
  technologyIcons: string[];
  role: string;
  clientName: string;
}

const QuickFacts = ({
  teamSize,
  timeline,
  technologies,
  technologyIcons,
  role,
  clientName,
}: QuickFactsProps) => {
  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Project Quick Facts
      </Typography>
      
      <Stack spacing={2}>
        <Box display="flex" alignItems="center">
          <People color="primary" sx={{ mr: 1.5 }} />
          <Typography variant="body1">
            Team Size: <strong>{teamSize}</strong> {teamSize > 1 ? 'members' : 'member'}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Timeline color="primary" sx={{ mr: 1.5 }} />
          <Typography variant="body1">
            Timeline: <strong>{timeline}</strong>
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Work color="primary" sx={{ mr: 1.5 }} />
          <Typography variant="body1">
            Role: <strong>{role}</strong>
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Code color="primary" sx={{ mr: 1.5 }} />
          <Box>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Technologies:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {technologies.map((tech, index) => (
                <Chip
                  key={tech}
                  label={tech}
                  icon={technologyIcons[index] ? (
                    <img 
                      src={technologyIcons[index]} 
                      alt={tech} 
                      style={{ width: 20, height: 20 }}
                    />
                  ) : undefined}
                  variant="outlined"
                  sx={{ m: 0.5 }}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default QuickFacts;
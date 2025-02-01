// components/Technology/TechStack.tsx
'use client';
import { Grid, Chip } from '@mui/material';
import { motion } from 'framer-motion';

export const TechStack = ({ technologies, icons }: { 
  technologies: string[], 
  icons: React.ElementType[] 
}) => {
  return (
    <Grid container spacing={1}>
      {technologies.map((tech, index) => (
        <TechChip key={tech} tech={tech} Icon={icons[index]} />
      ))}
    </Grid>
  );
};

const TechChip = ({ tech, Icon }: { tech: string, Icon: React.ElementType }) => {
  return (
    <Grid item xs={6}>
      <motion.div whileHover={{ scale: 1.03 }}>
        <Chip
          label={tech}
          icon={<Icon />}
          sx={{ 
            width: '100%',
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'action.hover' }
          }}
        />
      </motion.div>
    </Grid>
  );
};
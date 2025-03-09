'use client';

import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ReturnButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onClick}
        sx={{
          background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
          color: 'white',
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: 2,
          '&:hover': { background: 'linear-gradient(45deg, #21CBF3, #2196F3)' },
        }}
      >
        Return
      </Button>
    </motion.div>
  );
};

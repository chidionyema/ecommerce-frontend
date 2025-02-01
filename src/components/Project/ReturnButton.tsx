// components/Navigation/ReturnButton.tsx
'use client';
import { IconButton, Button } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ReturnButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onClick}
        sx={{ /*...*/ }}
      >
        Return
      </Button>
    </motion.div>
  );
};
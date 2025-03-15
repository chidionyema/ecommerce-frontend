// src/components/SearchFilter/components/ResultsInfo.tsx

import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { ColorConfig, SearchResults } from '../types';

interface ResultsInfoProps {
  loading: boolean;
  results: SearchResults;
  colors: ColorConfig;
}

export const ResultsInfo = ({
  loading,
  results,
  colors,
}: ResultsInfoProps) => {
  // Format the result text based on count
  const getResultText = () => {
    const { count, total } = results;
    
    if (count === 0) {
      return 'No matching results found';
    }
    
    if (count === total) {
      return `Showing all ${count.toLocaleString()} results`;
    }
    
    return `Showing ${count.toLocaleString()} of ${total.toLocaleString()} results`;
  };
  
  return (
    <Box sx={{ position: 'relative' }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: loading ? 400 : 500 }}>
        {loading ? 'Updating results...' : getResultText()}
      </Typography>
      
      {loading && (
        <LinearProgress 
          sx={{ 
            position: 'absolute',
            bottom: -8,
            left: 0,
            right: 0,
            height: 2,
            bgcolor: 'transparent',
            '& .MuiLinearProgress-bar': {
              bgcolor: colors.primary,
            }
          }} 
        />
      )}
    </Box>
  );
};
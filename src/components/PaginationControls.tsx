// src/components/PaginationControls.tsx
import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
            <IconButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                <ArrowBack />
            </IconButton>
            <Typography variant="body1">{`${currentPage} of ${totalPages}`}</Typography>
            <IconButton disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                <ArrowForward />
            </IconButton>
        </Box>
    );
};

export default PaginationControls;

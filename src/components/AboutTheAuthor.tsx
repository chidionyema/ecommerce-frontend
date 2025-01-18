import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, Avatar } from '@mui/material';

// 1) Container for the entire author section
const AuthorSectionBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  gap: theme.spacing(3),
  alignItems: 'center',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
}));

// 2) Author avatar using MUI's Avatar
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '100px',
  height: '100px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
}));

// 3) Author details stacked vertically
const AuthorDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

// 4) CTA button to visit author’s website
const AuthorCTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textTransform: 'none',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// ========== Props & Types ==========
export interface AuthorInfo {
  name: string;
  avatar: string;
  bio: string;
  website: string;
}

interface AboutTheAuthorProps {
  author: AuthorInfo;
}

const AboutTheAuthor: React.FC<AboutTheAuthorProps> = ({ author }) => {
  return (
    <AuthorSectionBox>
      <StyledAvatar src={author.avatar} alt={author.name} />
      <AuthorDetails>
        <Typography variant="h5" fontWeight="bold">
          {author.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {author.bio}
        </Typography>

        <AuthorCTAButton
          variant="contained"
          onClick={() => window.open(author.website, '_blank')}
        >
          Visit Author&apos;s Website
        </AuthorCTAButton>
      </AuthorDetails>
    </AuthorSectionBox>
  );
};

export default AboutTheAuthor;

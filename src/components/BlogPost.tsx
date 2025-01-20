import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SEO from './SEO';

interface BlogPostProps {
  title: string;
  content: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, content }) => {
  return (
    <div>
      <SEO title={title} description={`Read our blog post on ${title}.`} />
      <Container maxWidth="md" aria-label={`Post content for ${title}`}>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" paragraph>
            {content}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default BlogPost;

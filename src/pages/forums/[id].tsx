import React from 'react';
import { useRouter } from 'next/router';
import { useForum } from '../../context/ForumContext';
import { Container, Typography, Paper, Button, Box } from '@mui/material';

const ForumDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state, loading, error } = useForum();
  const forum = state.forums.find(f => f.id === id);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  if (!forum) {
    return <Typography>Forum not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>{forum.title}</Typography>
        <Typography variant="body1" paragraph>{forum.description}</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>Posts</Typography>
          {forum.posts.map(post => (
            <Paper key={post.id} elevation={1} sx={{ p: 2, mb: 2 }}>
              <Typography variant="body1">{post.content}</Typography>
              <Typography variant="caption">By {post.author}</Typography>
            </Paper>
          ))}
        </Box>
        <Button variant="contained" color="primary" onClick={() => router.push('/forums')}>
          Back to Forums
        </Button>
      </Paper>
    </Container>
  );
};

export default ForumDetail;

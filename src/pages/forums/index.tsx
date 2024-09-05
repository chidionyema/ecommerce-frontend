import React from 'react';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';
import { useForum } from '../../context/ForumContext';

const ForumsPage: React.FC = () => {
  const { state, loading, error } = useForum();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        Forums
      </Typography>
      <Grid container spacing={4}>
        {state.forums.map(forum => (
          <Grid item xs={12} sm={6} md={4} key={forum.id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>{forum.title}</Typography>
              <Typography variant="body1" paragraph>{forum.description}</Typography>
              <Button variant="contained" color="primary" href={`/forums/${forum.id}`}>
                View Forum
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ForumsPage;

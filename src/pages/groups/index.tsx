import React from 'react';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';
import { useGroup } from '../../context/GroupContext';

const GroupsPage: React.FC = () => {
  const { state, loading, error } = useGroup();

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        Groups
      </Typography>
      <Grid container spacing={4}>
        {state.groups.map(group => (
          <Grid item xs={12} sm={6} md={4} key={group.id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>{group.name}</Typography>
              <Typography variant="body1" paragraph>{group.description}</Typography>
              <Button variant="contained" color="primary" href={`/groups/${group.id}`}>
                View Group
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GroupsPage;

import React from 'react';
import { useRouter } from 'next/router';
import { useGroup } from '../../context/GroupContext';
import { Container, Typography, Paper, Button, Box } from '@mui/material';

const GroupDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { state, loading, error } = useGroup();
  const group = state.groups.find(g => g.id === id);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>{error}</Typography>;

  if (!group) {
    return <Typography>Group not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>{group.name}</Typography>
        <Typography variant="body1" paragraph>{group.description}</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>Members</Typography>
          {group.members.map(member => (
            <Paper key={member.id} elevation={1} sx={{ p: 2, mb: 2 }}>
              <Typography variant="body1">{member.name}</Typography>
            </Paper>
          ))}
        </Box>
        <Button variant="contained" color="primary" onClick={() => router.push('/groups')}>
          Back to Groups
        </Button>
      </Paper>
    </Container>
  );
};

export default GroupDetail;

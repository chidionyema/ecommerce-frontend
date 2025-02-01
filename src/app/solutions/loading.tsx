// app/solutions/loading.tsx
import { Skeleton } from '@mui/material';

export default function Loading() {
  return (
    <PageLayout>
      <Skeleton variant="rounded" height={400} />
      <Grid container spacing={4}>
        {[...Array(6)].map((_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Skeleton variant="rounded" height={300} />
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
}
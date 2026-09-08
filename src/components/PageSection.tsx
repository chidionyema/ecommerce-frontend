import { Box, Container, SxProps } from '@mui/material';

interface PageSectionProps {
  children: React.ReactNode;
  containerSx?: SxProps;
  sectionSx?: SxProps;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const PageSection: React.FC<PageSectionProps> = ({
  children,
  containerSx,
  sectionSx,
  maxWidth = 'lg',
}) => (
  <Container
    maxWidth={maxWidth}
    sx={{
      p: { xs: 2, sm: 4 },
      display: 'flex',          // ADD display: 'flex'
      justifyContent: 'center', // ADD justifyContent: 'center'
    ...containerSx,
    }}
  >
    <Box sx={{ mt: 2, mb: 2,...sectionSx }}>{children}</Box>
  </Container>
);

export default PageSection;
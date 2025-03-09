import { Box, Container, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface PageSectionProps {
  children: React.ReactNode;
  containerSx?: SxProps<Theme>;
  sectionSx?: SxProps<Theme>;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  sx?: any; 
  bgcolor?: string;
}

const PageSection: React.FC<PageSectionProps> = ({
  children,
  containerSx,
  sectionSx,
  maxWidth = 'lg',
}) => (
  <Box sx={{ ...sectionSx }}> {/* Use sectionSx on the outer Box */ }
    <Container
      maxWidth={maxWidth}
      sx={{
        display: 'flex',
        flexDirection: 'column', // Stack content vertically
        alignItems: 'center',     // Center content horizontally
        ...containerSx,         // Apply custom container styles
      }}
    >
      {children}
    </Container>
  </Box>
);

export default PageSection;
export type { PageSectionProps };
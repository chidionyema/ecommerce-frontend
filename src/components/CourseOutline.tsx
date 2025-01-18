import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

const OutlineContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const OutlineHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  fontSize: '1.25rem',
}));

// Example shape for your "lessons" data
type Lesson = {
  title: string;
  duration?: string;
  description?: string;
};

interface OutlineProps {
  outlineTitle?: string;             // e.g., "Course Outline"
  lessons: Lesson[];
}

const CourseOutline: React.FC<OutlineProps> = ({
  outlineTitle = "Course Outline",
  lessons,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <OutlineContainer>
      <OutlineHeading variant="h5">{outlineTitle}</OutlineHeading>
      <Divider sx={{ mb: 2 }} />
      {lessons.map((lesson, idx) => (
        <Accordion
          key={idx}
          expanded={expanded === `panel-${idx}`}
          onChange={handleChange(`panel-${idx}`)}
          disableGutters
          sx={{ backgroundColor: 'transparent' }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600 }}>{lesson.title}</Typography>
            {lesson.duration && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: 'auto', mr: 1 }}
              >
                {lesson.duration}
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              {lesson.description || "No additional details."}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </OutlineContainer>
  );
};

export default CourseOutline;

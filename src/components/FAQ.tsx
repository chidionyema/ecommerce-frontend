'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  useTheme,
  alpha
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

const FAQ = ({ items }: FAQProps) => {
  const theme = useTheme();
  const [activeAccordion, setActiveAccordion] = useState<number | false>(false);

  const handleAccordionChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setActiveAccordion(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 8, mb: { xs: 8, md: 12 } }}>
      <Typography
        variant="h2"
        component="h2"
        align="center"
        sx={{
          mb: 2,
          fontWeight: 800,
          fontSize: { xs: '2.2rem', md: '2.8rem' }
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: 800,
          mx: 'auto',
          mb: 8,
          fontSize: '1.1rem'
        }}
      >
        Find answers to common questions about our services and process
      </Typography>

      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
          px: { xs: 2, sm: 4 },
        }}
      >
        {items.map((item, index) => (
          <Accordion
            key={index}
            expanded={activeAccordion === index}
            onChange={handleAccordionChange(index)}
            sx={{
              mb: 2,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
              backdropFilter: 'blur(10px)',
              boxShadow: theme.shadows[2],
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}
              aria-controls={`faq-panel-${index}-content`}
              id={`faq-panel-${index}-header`}
              sx={{
                '& .MuiAccordionSummary-content': {
                  my: 1,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: theme.palette.primary.light,
                  }
                }}
              >
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.7,
                  fontSize: '1.05rem'
                }}
              >
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FAQ;
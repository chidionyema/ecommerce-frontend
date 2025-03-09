'use client';

import React, { useState } from 'react';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  alpha,
  useTheme,
  type ContainerProps,
  type SxProps,
  type Theme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FAQItem {
  question: string;
  answer: string;
  id?: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
  containerProps?: ContainerProps;
}

const FAQ = ({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our services",
  sx = {},
  fullWidth = false,
  containerProps = {}
}: FAQProps) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : null);
  };

  const faqItems = items.map((item, index) => ({
    ...item,
    id: item.id || `faq-item-${index}`
  }));

  return (
    <Box 
      component="section" 
      sx={{
        py: { xs: 6, md: 10 },
        ...sx
      }}
      aria-labelledby="faq-section-title"
    >
      <Container 
        maxWidth={fullWidth ? false : "lg"} 
        {...containerProps}
      >
        {(title || subtitle) && (
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
            {title && (
              <Typography
                id="faq-section-title"
                variant="h2"
                component="h2"
                sx={{
                  mb: 2,
                  fontWeight: 800,
                  fontSize: { xs: '2.2rem', md: '2.8rem' }
                }}
              >
                {title}
              </Typography>
            )}
            
            {subtitle && (
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: 800,
                  mx: 'auto',
                  mb: 2,
                  fontSize: '1.1rem'
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}

        <Box 
          sx={{ 
            maxWidth: 900, 
            mx: 'auto',
            boxShadow: theme.shadows[5],
            borderRadius: 3,
            overflow: 'hidden'
          }}
        >
          {faqItems.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id!)}
              disableGutters
              elevation={0}
              sx={{
                backgroundColor: expanded === faq.id 
                  ? alpha(theme.palette.primary.main, 0.05) 
                  : theme.palette.background.paper,
                '&:not(:last-child)': {
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                },
                transition: 'background-color 0.3s ease',
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon 
                    sx={{ 
                      color: expanded === faq.id ? theme.palette.primary.main : theme.palette.text.secondary,
                      transition: 'transform 0.3s ease, color 0.3s ease',
                      transform: expanded === faq.id ? 'rotate(180deg)' : 'rotate(0deg)'
                    }} 
                  />
                }
                aria-controls={`${faq.id}-content`}
                id={`${faq.id}-header`}
                sx={{
                  py: 2.5,
                  px: { xs: 2, md: 4 },
                  '&.Mui-expanded': {
                    minHeight: 0,
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  component="h3"
                  sx={{ 
                    fontWeight: 600,
                    color: expanded === faq.id ? theme.palette.primary.main : theme.palette.text.primary,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              
              <AccordionDetails sx={{ px: { xs: 2, md: 4 }, pb: 3, pt: 0 }}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    lineHeight: 1.7
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
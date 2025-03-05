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
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * FAQ Item interface
 * @typedef {Object} FAQItem
 * @property {string} question - The question text
 * @property {string} answer - The answer text
 * @property {string} [id] - Optional unique identifier
 */

/**
 * FAQ Props interface
 * @typedef {Object} FAQProps
 * @property {Array<FAQItem>} items - Array of FAQ items to display
 * @property {string} [title] - Optional section title
 * @property {string} [subtitle] - Optional section subtitle
 * @property {Object} [sx] - Optional MUI sx prop for additional styling
 * @property {boolean} [fullWidth] - Whether to use full width container
 * @property {Object} [containerProps] - Additional props for Container component
 */

/**
 * Reusable FAQ component that displays a list of questions and answers in an accordion layout
 * Can be used on any page that requires an FAQ section
 * 
 * @param {FAQProps} props - Component props
 */
const FAQ = ({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our services",
  sx = {},
  fullWidth = false,
  containerProps = {}
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  // Generate unique IDs if not provided
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
          {faqItems.map((faq, index) => (
            <Accordion
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
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
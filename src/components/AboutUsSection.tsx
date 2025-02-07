'use client';

import React from 'react';
import { Box, Typography, Container, Button, useTheme } from '@mui/material';
import NextLink from 'next/link';
import { SPACING, getSharedStyles } from '../utils/sharedStyles';
import PageSection from '../components/PageSection'; // Assuming you want to use PageSection for consistent section styling

const AboutUsSection: React.FC = () => {
  const theme = useTheme();
  const styles = getSharedStyles(theme); // Get shared styles

  return (
    <PageSection>
      <Container maxWidth="md"> {/* Adjust maxWidth as needed for your layout */}
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            ...styles.pageTitle, // Use shared page title style
            mb: SPACING.medium,
          }}
        >
          About Us
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: SPACING.medium }}>
          Are you tired of seeing your technology platform feel less like an engine for growth and more like a source of constant headaches?
          In today's digital landscape, corporations are under immense pressure to build and maintain robust, scalable, and secure platforms.
          But the reality is often far from the promise.
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: SPACING.medium }}>
          We understand the challenges firsthand. We've seen corporations struggle with:
          <Box component="ul" sx={{ ml: 4, mt: 1 }}>
            <Box component="li">
              <b>Fragmented User Experiences:</b> Disconnected interfaces that frustrate users and hinder adoption.
            </Box>
            <Box component="li">
              <b>Infrastructure Sprawl:</b> Complex, трудноуправляемые (hard-to-manage) infrastructures that drain resources and limit agility.
            </Box>
            <Box component="li">
              <b>Relentless Security Threats:</b> Constant vulnerabilities and the daunting task of maintaining robust security across ever-expanding platforms.
            </Box>
            <Box component="li">
              <b>Scalability Bottlenecks:</b> Platforms that falter and fail to adapt as business demands grow.
            </Box>
            <Box component="li">
              <b>Best Practices Lost in Translation:</b> Valuable best practices often get lost or inconsistently applied across diverse teams and evolving technologies.
            </Box>
          </Box>
          Building a truly effective modern platform – one that is user-friendly, secure, scalable, and efficient – is a monumental undertaking.
          And for many organizations, it feels increasingly out of reach.
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: SPACING.medium }}>
          That’s precisely why <b>[Your Company Name]</b> was founded. We witnessed these struggles across industries and knew there had to be a better way – a way for technology to truly empower businesses, not hold them back. We believe corporations deserve platforms that are not just cutting-edge, but also <b>sustainable</b>, <b>secure</b>, and genuinely <b>drive business value</b>.
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: SPACING.medium }}>
          Our approach is grounded in <b>precision engineering</b> and a <b>security-first philosophy</b>. We combine deep expertise across the full technology stack – from intuitive UI/UX design to robust cloud infrastructure, DevOps automation, and proactive security measures – with <b>agile methodologies</b> and a relentless commitment to <b>best practices</b>. We don't just build platforms; we architect solutions for sustained success, tailored to the unique needs of each enterprise we partner with.
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: SPACING.medium }}>
          <b>[Your Company Name]</b> provides a comprehensive suite of services designed to directly alleviate these core platform pain points:
          <Box component="ul" sx={{ ml: 4, mt: 1 }}>
            <Box component="li">
              <b>Intuitive UI/UX Design:</b> Crafting user-centered interfaces that are not only visually appealing but also drive engagement and user satisfaction.
            </Box>
            <Box component="li">
              <b>Scalable and Secure Infrastructure Architecture:</b> Building robust, cloud-native foundations that enable agility, scalability, and unwavering security.
            </Box>
            <Box component="li">
              <b>DevOps and Automation Expertise:</b> Streamlining development lifecycles, accelerating time-to-market, and ensuring platform reliability and maintainability through automation and best-in-class DevOps practices.
            </Box>
            <Box component="li">
              <b>Proactive Security Solutions:</b> Implementing comprehensive security strategies, conducting rigorous audits, and hardening platforms against evolving threats to safeguard your valuable data and operations.
            </Box>
            <Box component="li">
              <b>Best Practice Consulting & Training:</b> Guiding and empowering your teams to adopt and consistently apply industry-leading best practices across all aspects of platform development and maintenance.
            </Box>
          </Box>
        </Typography>

        {/* Optional: Team Section - you can add this later if you want */}
        {/*
        <Typography variant="body1" paragraph sx={{ mb: SPACING.medium }}>
          Our team comprises seasoned architects, developers, security specialists, and UX/UI designers who bring decades of collective experience in navigating the complexities of enterprise platforms. We are passionate about solving tough challenges and empowering our clients with truly transformative technology.
        </Typography>
        */}

        <Typography variant="body1" paragraph sx={{ mb: SPACING.large }}>
          Imagine a technology platform that empowers your business to soar, not weighs it down. A platform that is secure by design, scales effortlessly with your growth, and delights your users with its intuitive experience. That's the vision <b>[Your Company Name]</b> strives to make a reality for every client we partner with. We are committed to being your trusted guide and engineering partner in building the robust, future-proof digital platforms that will propel your business forward.
        </Typography>

        <Box sx={{ textAlign: 'center', mt: SPACING.large }}>
          <Button
            component={NextLink}
            href="/contact" // Replace with your actual contact page link
            variant="contained"
            color="primary"
            size="large"
            sx={styles.button} // Apply shared button styles
          >
            Let's Talk
          </Button>
        </Box>
      </Container>
    </PageSection>
  );
};

export default AboutUsSection;
"use client"

import React from "react"
import Head from "next/head"
import { Container, Box } from "@mui/material"
import { motion } from "framer-motion"
import UltimateScrollNavigation from "../components/Shared/UltimateScrollNavigation"
import { SPACING } from "../utils/sharedStyles"

// Static imports
import Hero from "../components/Home/Hero"
import TechnologyShowcase from "../components/Home/TechnologyShowcase"
import WhyChooseUs from "../components/Common/WhyChooseUs"
import ServicesGrid from "../components/Common/ServicesGrid"
import TestimonialsSection from "../components/Common/TestimonialsSection"
import CTASection from "../components/Home/CTASection"

// simple fade-in variants
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Enterprise Tech Solutions | Digital Transformation Experts</title>
        <meta
          name="description"
          content="Enterprise-grade technology solutions with precision engineering and proven results"
        />
      </Head>

      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, sm: 4 },
          py: 0,
        }}
      >
        {/* Hero */}
        <Box
          sx={{
            mt: 0,
            mb: { xs: 0, md: SPACING.large },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Hero />
        </Box>

        {/* All sections loaded statically */}
        {[
          <TechnologyShowcase key="tech" />,
          <WhyChooseUs key="why" />,
          <ServicesGrid key="services" />,
          <TestimonialsSection key="testimonials" />,
          <CTASection key="cta" />,
        ].map((SectionComponent, idx) => (
          <Box
            key={idx}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}  // Reduced trigger threshold
            variants={variants}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 3, md: SPACING.large * 2 },
              mb: idx < 4 ? { xs: 3, md: SPACING.large * 2 } : 0,
            }}
          >
            {SectionComponent}
          </Box>
        ))}
      </Container>

      <UltimateScrollNavigation
        showProgressIndicator
        showSectionMenu
        showLabels
        enableSmartPositioning
        hideDelay={2500}
      />
    </>
  )
}
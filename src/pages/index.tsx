import React from 'react';
import Link from 'next/link';
import {
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import { motion } from 'framer-motion';

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  color: '#fff',
  textAlign: 'center',
  height: '100vh',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: '80vh',
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing(0, 2),
  top: '50%',
  transform: 'translateY(-50%)',
}));

const BackgroundVideo = styled('video')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  top: 0,
  left: 0,
  zIndex: 1,
  filter: 'brightness(0.7)',
});

const CTAButton = styled(Button)(({ theme }) => ({
  fontSize: '1.2rem',
  padding: theme.spacing(1.5, 4),
  borderRadius: '30px',
  background: '#ff4081',
  color: '#fff',
  marginTop: theme.spacing(3),
  textTransform: 'uppercase',
  boxShadow: '0 8px 20px rgba(255, 64, 129, 0.4)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#ff79a7',
    transform: 'translateY(-5px)',
  },
}));

const ProductCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  borderRadius: '15px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const TestimonialCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '15px',
  textAlign: 'center',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  margin: theme.spacing(0, 2),
}));

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ backgroundColor: '#f4f4f4', color: '#333' }}>
      {/* Hero Section */}
      <HeroSection>
        <BackgroundVideo autoPlay loop muted playsInline>
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </BackgroundVideo>
        <HeroContent>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                fontSize: isMobile ? '2.5rem' : '4rem',
                lineHeight: 1.2,
                textShadow: '2px 2px 15px rgba(0, 0, 0, 0.5)',
              }}
            >
              Unleash the Magic Within
            </Typography>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: isMobile ? '1rem' : '1.25rem',
                maxWidth: '700px',
                margin: '20px auto',
                opacity: 0.9,
              }}
            >
              Discover enchanting products that elevate your spiritual journey.
            </Typography>
            <Link href="/shop" passHref>
              <CTAButton variant="contained">Explore Now</CTAButton>
            </Link>
          </motion.div>
        </HeroContent>
      </HeroSection>

      {/* Featured Products Carousel */}
      <Container sx={{ mt: 10 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 4, fontWeight: 'bold', position: 'relative' }}
        >
          Best Sellers
        </Typography>
        <Carousel
          indicators={false}
          navButtonsAlwaysVisible
          animation="slide"
          autoPlay
          interval={5000}
        >
          {[1, 2].map((slide) => (
            <Grid container spacing={4} key={slide}>
              {[
                {
                  title: 'Mystic Candle Set',
                  price: '$30.00',
                  image: '/images/mystic-candle.jpg',
                  description: 'Set of 3 handmade candles for meditation and rituals.',
                },
                {
                  title: 'Herbal Incense',
                  price: '$15.00',
                  image: '/images/herbal-incense.jpg',
                  description: 'Natural incense sticks with calming properties.',
                },
                {
                  title: 'Crystal Healing Kit',
                  price: '$50.00',
                  image: '/images/crystal-healing.jpg',
                  description: 'Includes crystals, instructions, and a guidebook.',
                },
              ].map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ProductCard elevation={3}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.title}
                        sx={{ width: '100%', borderRadius: '10px' }}
                      />
                    </motion.div>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                      {product.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#ff4081', mb: 1 }}>
                      {product.price}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {product.description}
                    </Typography>
                    <Button variant="contained" color="primary" href="/shop" sx={{ mt: 2 }}>
                      Add to Cart
                    </Button>
                  </ProductCard>
                </Grid>
              ))}
            </Grid>
          ))}
        </Carousel>
      </Container>

      {/* Newsletter Signup Section */}
      <Box sx={{ backgroundColor: '#ff4081', py: 8, mt: 8, color: '#fff', textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Join Our Community
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '600px', margin: '0 auto', mb: 4 }}>
            Subscribe to our newsletter and get exclusive updates on new products and special offers.
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                padding: '12px 20px',
                borderRadius: '30px',
                border: 'none',
                width: isMobile ? '100%' : '300px',
                fontSize: '1rem',
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#fff',
                color: '#ff4081',
                padding: '12px 30px',
                borderRadius: '30px',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Customer Testimonials */}
      <Container sx={{ py: 10, mt: 8 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
          What Our Customers Say
        </Typography>
        <Carousel
          indicators={false}
          navButtonsAlwaysVisible
          animation="slide"
          autoPlay
          interval={6000}
        >
          {[1, 2].map((slide) => (
            <Grid container justifyContent="center" key={slide}>
              {[
                {
                  name: 'John Doe',
                  feedback: '"Amazing quality and fast delivery. The candles have such a calming scent."',
                  image: '/images/customer1.jpg',
                },
                {
                  name: 'Jane Smith',
                  feedback: '"I absolutely love the crystal healing kit. It’s become a part of my daily routine!"',
                  image: '/images/customer2.jpg',
                },
              ].map((testimonial, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <TestimonialCard elevation={3}>
                    <Box
                      component="img"
                      src={testimonial.image}
                      alt={testimonial.name}
                      sx={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        mb: 2,
                        objectFit: 'cover',
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mt: 1 }}>
                      {testimonial.feedback}
                    </Typography>
                  </TestimonialCard>
                </Grid>
              ))}
            </Grid>
          ))}
        </Carousel>
      </Container>

      {/* Instagram Feed Section */}
      <Box sx={{ py: 8, backgroundColor: '#fafafa' }}>
        <Container>
          <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
            Follow Us on Instagram
          </Typography>
          {/* Placeholder for Instagram images */}
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={4} sm={2} key={item}>
                <Box
                  component="img"
                  src={`/images/instagram${item}.jpg`} // Replace with actual images
                  alt={`Instagram ${item}`}
                  sx={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', py: 10, background: '#333', color: '#fff' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Ready to Discover More?
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '700px', margin: '0 auto 20px' }}>
          Dive into our collection and find the perfect items that resonate with your soul.
        </Typography>
        <Link href="/shop" passHref>
          <CTAButton variant="contained" sx={{ backgroundColor: '#ff4081', color: '#fff' }}>
            Shop Now
          </CTAButton>
        </Link>
      </Box>
    </Box>
  );
};

export default HomePage;

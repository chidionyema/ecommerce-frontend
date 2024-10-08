import React from 'react';
import Link from 'next/link';
import { Button, Typography, Box, Grid, Paper, Container } from '@mui/material';
import {
  Security as SecurityIcon,
  AccessTime as AccessTimeIcon,
  Forum as ForumIcon,
  MonetizationOn as MonetizationOnIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Footer from '../components/Footer';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(/ecommerce-hero.jpg)', // Replace with your own high-quality image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  textAlign: 'center',
  padding: '150px 20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0px 10px 30px rgba(0,0,0,0.5)',
  borderRadius: '20px',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    padding: '100px 20px',
  },
}));

const ProductCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: '15px',
  transition: 'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  fontSize: '1.2rem',
  padding: theme.spacing(1.5, 4),
  borderRadius: '30px',
  background: '#1976d2',
  color: '#fff',
  marginTop: theme.spacing(3),
  '&:hover': {
    backgroundColor: '#155a9c',
    transform: 'scale(1.05)',
  },
}));

const HomePage: React.FC = () => {
  return (
    <Box sx={{ fontFamily: '"Poppins", sans-serif', background: '#f5f5f5', color: '#333' }}>
      {/* Hero Section */}
      <HeroSection>
        <Typography variant="h2" sx={{ fontWeight: 'bold', textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
          Discover Our Premium Products
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: '700px', margin: '20px auto', textShadow: '1px 1px 5px rgba(0,0,0,0.3)' }}>
          Quality items designed to enhance your lifestyle. Shop the latest trends and get exclusive discounts.
        </Typography>
        <Link href="/shop" passHref>
          <CTAButton variant="contained">Start Shopping</CTAButton>
        </Link>
      </HeroSection>

      {/* Featured Products Section */}
      <Container>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4 }}>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: 'Mystic Candle Set',
              price: '$30.00',
              image: '/images/mystic-candle.jpg', // Replace with product image
              description: 'Set of 3 handmade candles for meditation and rituals.',
            },
            {
              title: 'Herbal Incense',
              price: '$15.00',
              image: '/images/herbal-incense.jpg', // Replace with product image
              description: 'Natural incense sticks with calming properties.',
            },
            {
              title: 'Crystal Healing Kit',
              price: '$50.00',
              image: '/images/crystal-healing.jpg', // Replace with product image
              description: 'Includes crystals, instructions, and a guidebook.',
            },
          ].map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProductCard elevation={3}>
                <Box component="img" src={product.image} alt={product.title} sx={{ width: '100%', borderRadius: '10px' }} />
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
                  {product.title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#1976d2', mb: 1 }}>
                  {product.price}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
                <Button variant="outlined" color="primary" href="/shop" sx={{ mt: 2 }}>
                  Add to Cart
                </Button>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Customer Testimonials Section */}
      <Box sx={{ background: '#f8f8f8', py: 8, mt: 8 }}>
        <Container>
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
            What Our Customers Say
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: 'John Doe',
                feedback: '"Amazing quality and fast delivery. The candles have such a calming scent."',
                image: '/images/customer1.jpg', // Replace with testimonial image
              },
              {
                name: 'Jane Smith',
                feedback: '"I absolutely love the crystal healing kit. It’s become a part of my daily routine!"',
                image: '/images/customer2.jpg', // Replace with testimonial image
              },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: '15px',
                  }}
                >
                  <Box
                    component="img"
                    src={testimonial.image}
                    alt={testimonial.name}
                    sx={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: 2 }}
                  />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    {testimonial.feedback}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ textAlign: 'center', py: 8, background: '#1976d2', color: '#fff' }}>
        <Typography variant="h4" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '700px', margin: 'auto', mb: 4 }}>
          Join us today and enjoy exclusive access to new products, offers, and more!
        </Typography>
        <Link href="/shop" passHref>
          <CTAButton variant="contained" sx={{ backgroundColor: '#fff', color: '#1976d2' }}>
            Explore the Store
          </CTAButton>
        </Link>
      </Box>

    </Box>
  );
};

export default HomePage;

const bannerConfig = [
  {
      id: 'banner1',
      message: 'Summer Sale! Get up to 50% off selected items.',
      active: true,
      condition: () => true,
      imageUrl: '/images/new-arrivals.jpg', // Add a background image for the banner
      gradient: 'linear-gradient(to right, rgba(0, 0, 255, 0.7), rgba(0, 255, 255, 0.7))', // Gradient color for overlayay
  }
];

export default bannerConfig;

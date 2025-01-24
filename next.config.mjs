// next.config.mjs
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  compress: true,
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    domains: ['www.googletagmanager.com'],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  env: {
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
  // For static exports, use _headers file instead of headers config
  generateEtags: false
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig)
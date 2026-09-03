/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats: AVIF first (smaller), WebP as fallback
    formats: ['image/avif', 'image/webp'],
    // Breakpoints that generate responsive srcset entries
    deviceSizes: [400, 640, 800, 1080, 1200, 1920],
    // Additional small sizes for fixed-width images (icons etc.)
    imageSizes: [64, 128, 256, 400],
    // 30-day CDN cache for optimized images (in seconds)
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

module.exports = nextConfig;

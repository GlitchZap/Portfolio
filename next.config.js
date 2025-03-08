/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your configuration options here
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com'],
  },
  // Add any other configuration you need
};

module.exports = nextConfig;
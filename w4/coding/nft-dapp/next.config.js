/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {fs: false, net: false, tls: false};
    return config;
  },
  images: {
    domains: ['ipfs.io', 'assets.bueno.art'],
  },
};

module.exports = nextConfig;

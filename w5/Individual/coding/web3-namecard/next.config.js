/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  env: {
    ALCHEMY_APIKEY: process.env.ALCHEMY_APIKEY,
    WALLETCONNECT_PROJECTID: process.env.WALLETCONNECT_PROJECTID,
    ENABLE_TESTNETS: process.env.ENABLE_TESTNETS,
  },
};

module.exports = nextConfig;

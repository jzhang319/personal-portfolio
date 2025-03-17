const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["vercel.com"],
    unoptimized: false,
  },
  trailingSlash: true,
  swcMinify: true,
  poweredByHeader: false,
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === "development",
          dest: "public",
          runtimeCaching,
        },
      },
    ],
  ],
  nextConfig
);

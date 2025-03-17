const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["vercel.com"],
    unoptimized: false,
  },
  output: "standalone",
  assetPrefix: process.env.NODE_ENV === "production" ? undefined : undefined,
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

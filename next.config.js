/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com", "https://robohash.org/"],
  },
};

module.exports = nextConfig;

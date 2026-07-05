/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: "/motion", destination: "/motion/index.html" }];
  }
};

module.exports = nextConfig;

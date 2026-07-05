/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      // beforeFiles so "/" wins over app/page.tsx; the old leadpilot
      // landing page stays in the codebase but is no longer routed.
      beforeFiles: [
        { source: "/", destination: "/motion/index.html" },
        { source: "/motion", destination: "/motion/index.html" }
      ]
    };
  }
};

module.exports = nextConfig;

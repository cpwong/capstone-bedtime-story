import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/capstone-bedtime-story', // Matches the GitHub repo name
};

export default nextConfig;

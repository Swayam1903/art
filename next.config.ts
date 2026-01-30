import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

console.log(">>> [DEPLOY CHECK] SUPABASE_DATABASE_URL present:", !!process.env.SUPABASE_DATABASE_URL);

export default nextConfig;

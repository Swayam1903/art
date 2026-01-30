import type { NextConfig } from "next";

console.log(">>> [BUILD CHECK] DATABASE_URL is:", process.env.DATABASE_URL ? "FOUND" : "NOT FOUND");
console.log(">>> [BUILD CHECK] SUPABASE_URL is:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "FOUND" : "NOT FOUND");


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;

import type { NextConfig } from "next";

console.log(">>> [BUILD CHECK] DATABASE_URL is:", process.env.DATABASE_URL ? "FOUND" : "NOT FOUND");
console.log(">>> [BUILD CHECK] SUPABASE_URL is:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "FOUND" : "NOT FOUND");


const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
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
} as any;

console.log(">>> [BUILD CHECK] DATABASE_URL present:", !!process.env.DATABASE_URL);
console.log(">>> [BUILD CHECK] Env keys start with 'DB':", Object.keys(process.env).filter(k => k.startsWith('DB')));
console.log(">>> [BUILD CHECK] Env keys start with 'NEXT_PUBLIC':", Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC')));


export default nextConfig;

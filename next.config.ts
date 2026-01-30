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

console.log(">>> [DEPLOY CHECK] -----------------------------");
console.log(">>> [DEPLOY CHECK] SUPABASE_DATABASE_URL present:", !!process.env.SUPABASE_DATABASE_URL);
console.log(">>> [DEPLOY CHECK] SUPABASE_URL present:", !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL));
console.log(">>> [DEPLOY CHECK] Total Env Keys:", Object.keys(process.env).length);
console.log(">>> [DEPLOY CHECK] Keys starting with 'SUPA':", Object.keys(process.env).filter(k => k.startsWith('SUPA')));
console.log(">>> [DEPLOY CHECK] -----------------------------");

export default nextConfig;

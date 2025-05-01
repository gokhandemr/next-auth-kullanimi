import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: "1mb", allowedOrigins: ["*"] }, // App Router için öneriliyor
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "klbtheme.com",
      }
    ],
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://clotya-backend.onrender.com/api";
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${apiUrl.replace(/\/$/, "")}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;

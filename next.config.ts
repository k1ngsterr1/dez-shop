import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "6001",
        pathname: "/uploads/products/**",
      },
    ],
  },
};

export default nextConfig;

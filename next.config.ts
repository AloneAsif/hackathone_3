import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Other configuration options
  webpack: (config) => {
    config.resolve.alias["@public"] = path.resolve(__dirname, "public");
    return config;
  },
  
  // Add image domains configuration
  images: {
    domains: ["cdn.sanity.io"], // Add Sanity's domain here
  },
};

export default nextConfig;

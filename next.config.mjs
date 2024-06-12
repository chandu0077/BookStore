/** @type {import('next').NextConfig} */
// const path = require("path");
import path from "path";

const nextConfig = {
  experimental: {
    // nextScriptWorkers: true,
  },
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "www.facebook.com",
      "images.rockstar.in",
      "rockstar-website-images.s3.ap-south-1.amazonaws.com",
      "rockstar-users-documents-prod.s3.ap-south-1.amazonaws.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rockstar-user-documents-dev.s3.ap-south-1.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;

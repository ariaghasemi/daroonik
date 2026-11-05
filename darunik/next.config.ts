import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/daroonik",
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [64, 96, 128, 190, 256, 384],
  },
  poweredByHeader: false,
};

export default nextConfig;

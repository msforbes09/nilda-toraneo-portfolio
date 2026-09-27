import type { NextConfig } from "next";

// GitHub Pages serves the site under /<repo>; the deploy workflow sets
// NEXT_PUBLIC_BASE_PATH=/nilda-portfolio. Locally it is empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;

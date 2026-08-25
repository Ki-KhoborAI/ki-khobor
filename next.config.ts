import type { NextConfig } from "next";

// When deployed under a subpath (e.g. ki-khobor.com/txg-nagaland), set
// NEXT_PUBLIC_BASE_PATH=/txg-nagaland in the environment. Left empty for local
// dev, so the app runs at http://localhost:3000/ as normal.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
};

export default nextConfig;

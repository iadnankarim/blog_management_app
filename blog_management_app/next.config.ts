import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Set the output file tracing root to silence the lockfile warning
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;

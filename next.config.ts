import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    /technology retired: the content architecture folds it into Capabilities,
    which now publishes technology mapped to real projects instead.
  */
  async redirects() {
    return [
      {
        source: "/technology",
        destination: "/capabilities",
        permanent: true,
      },
    ];
  },
  /*
    Every photo now lives in /public/images, so no remote image host is
    allowlisted. Adding one back means adding it here deliberately.
  */
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

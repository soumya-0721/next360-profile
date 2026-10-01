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
    Remote avatars for the hero-01 social-proof stack (Unsplash stock).
    Site photography itself stays local in /public/images.
  */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

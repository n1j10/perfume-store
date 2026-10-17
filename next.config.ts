import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "covers.openlibrary.org" },
      // Review avatars (initials) used by the seed data.
      { protocol: "https", hostname: "api.dicebear.com" },
      // Images uploaded by the Express backend to Neon Storage.
      { protocol: "https", hostname: "*.storage.c-6.us-east-2.aws.neon.tech" },
    ],
  },
};

export default nextConfig;

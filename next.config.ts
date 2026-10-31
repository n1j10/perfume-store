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
  poweredByHeader: false,
  // Baseline security headers on every route.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;

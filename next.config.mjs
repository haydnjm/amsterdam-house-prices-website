/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.funda.nl",
      },
      {
        protocol: "https",
        hostname: "casco-media-prod.global.ssl.fastly.net",
      },
    ],
  },
};

export default nextConfig;

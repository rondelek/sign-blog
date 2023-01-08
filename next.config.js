/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com",
        pathname: "/quwdqImMRbmi7vnnuvDU",
      },
    ],
  },
};

module.exports = nextConfig;

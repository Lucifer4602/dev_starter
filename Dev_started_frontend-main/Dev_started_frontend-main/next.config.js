/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "google.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;

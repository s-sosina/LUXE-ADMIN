import type { NextConfig } from "next";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // Ensure proper static generation
  trailingSlash: false,

  // Routing configuration (instead of vercel.json)
  // Uncomment and modify as needed:

  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/proxy/:path*',
  //       destination: 'https://api.example.com/:path*',
  //     },
  //   ];
  // },

  // async redirects() {
  //   return [
  //     {
  //       source: '/old-page',
  //       destination: '/new-page',
  //       permanent: true,
  //     },
  //   ];
  // },

  // async headers() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       headers: [
  //         { key: 'Access-Control-Allow-Origin', value: '*' },
  //         { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
  //       ],
  //     },
  //   ];
  // },
} as NextConfig;

export default nextConfig;

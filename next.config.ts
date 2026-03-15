import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/fitness/main',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: '/',
//         destination: '/fitness/main',
//         permanent: true,
//       },
//     ];
//   },
// };
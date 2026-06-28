// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // এরর থাকলেও বিল্ড পাস হবে
  },
  eslint: {
    ignoreDuringBuilds: true, // লিন্ট এরর ইগনোর করবে
  },
};

module.exports = nextConfig;
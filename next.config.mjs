/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '2.bp.blogspot.com',
      },
      {
        protocol: 'https',
        hostname: '2.bp.blogspot.com',
      },
      {
        protocol: 'http',
        hostname: '*.blogspot.com',
      },
      {
        protocol: 'https',
        hostname: '*.blogspot.com',
      },
      {
        protocol: 'https',
        hostname: 'tse3.mm.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: "imgs.search.brave.com",
      },
    ],
  },
};

export default nextConfig; // Correctly exporting ES module syntax

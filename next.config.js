/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'], // Add other domains if needed
  },
  webpack: (config) => {
    // Add support for importing shader files with Three.js
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader'],
    });
    return config;
  },
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    return [
      {
        source: '/blog/1',
        destination: '/blog/why-every-cs-student-should-build-a-personal-website', // use your actual slug here
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

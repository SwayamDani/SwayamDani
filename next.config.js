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
        destination: '/blog/why-every-cs-student-should-build-a-personal-website', 
        permanent: true,
      },
      {
        source: '/blog/2',
        destination: '/blog/behind-the-scenes-creating-a-password-security-assessment-tool', 
        permanent: true,
      },
      {
        source: '/li/blog1',
        destination: '/blog/why-every-cs-student-should-build-a-personal-website?utm_source=linkedin&utm_medium=social&utm_campaign=blog_share',
        permanent: false,
      },
      {
        source: '/li/blog2',
        destination: '/blog/behind-the-scenes-creating-a-password-security-assessment-tool?utm_source=linkedin&utm_medium=social&utm_campaign=blog_share',
        permanent: false,
      },
      {
        source: '/ig/blog1',
        destination: '/blog/why-every-cs-student-should-build-a-personal-website?utm_source=instagram&utm_medium=social&utm_campaign=blog_share',
        permanent: false,
      },
      {
        source: '/ig/blog2',
        destination: '/blog/behind-the-scenes-creating-a-password-security-assessment-tool?utm_source=instagram&utm_medium=social&utm_campaign=blog_share',
        permanent: false,
      },
      {
        source: '/x/blog1',
        destination: '/blog/why-every-cs-student-should-build-a-personal-website?utm_source=x&utm_medium=social&utm_campaign=blog_share',
        permanent: false,
      },
      {
        source: '/x/blog2',
        destination: '/blog/behind-the-scenes-creating-a-password-security-assessment-tool?utm_source=x&utm_medium=social&utm_campaign=blog_share',
        permanent: false,
      },
      {
        source: '/li/blog',
        destination: '/blog?utm_source=linkedin&utm_medium=social&utm_campaign=blog_share',
        permanent: false,
      },
      {
        source: '/ig/blog',
        destination: '/blog?utm_source=instagram&utm_medium=social&utm_campaign=blog_share',
        permanent: false,
      },
      {
        source: '/x/blog',
        destination: '/blog?utm_source=x&utm_medium=social&utm_campaign=blog_share',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

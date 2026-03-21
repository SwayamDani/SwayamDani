/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  turbopack: {
    rules: {
      '*.{glsl,vs,fs,vert,frag}': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
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

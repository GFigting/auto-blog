/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  pageExtensions: ['tsx', 'mdx'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'workflow-agent': false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
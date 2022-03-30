/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// module.exports = nextConfig;

module.exports = {
  images: {
    domains: ['secure.gravatar.com', 'avatars.githubusercontent.com'],
  },
};

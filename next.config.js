/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    KAKAO_MAP: process.env.KAKAO_MAP,
  },
};

module.exports = nextConfig;

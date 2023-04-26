/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    KAKAO_MAP: process.env.KAKAO_MAP,
    REST_API: process.env.REST_API,
  },
};

module.exports = nextConfig;

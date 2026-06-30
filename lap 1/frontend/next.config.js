/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // เปิดใช้งาน App Router
  experimental: {
    appDir: true,
  },
  // ตั้งค่า environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
}

module.exports = nextConfig

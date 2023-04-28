const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
})

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  // Next.js config
  disable: process.env.NODE_ENV === 'development',
  reactStrictMode: true,
})

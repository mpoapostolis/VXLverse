const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
})

/** @type {import('next').NextConfig} */
module.exports =
  process.env.NODE_ENV === 'development'
    ? {
        reactStrictMode: true,
      }
    : withPWA({
        swcMinify: true,
        compress: true,
        optimizeFonts: true,

        // Next.js config
        productionBrowserSourceMaps: true,
        reactStrictMode: true,
        experimental: {
          legacyBrowsers: false,
        },
      })

/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: !isProd
})

const nextConfig = {
  compiler: {
    styledComponents: true,
    reactStrictMode: true
  },
  experimental: {
    forceSwcTransforms: true
  },
  images: {
    domains: ['media.graphassets.com']
  }
}

module.exports = withPWA(nextConfig)

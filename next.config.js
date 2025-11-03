// next.config.js
const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`

const securityHeaders = [
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy.replace(/\n/g, '') },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

// === ENV → 설정 파생 ===
const isExport = !!process.env.EXPORT
const rawBasePath = (process.env.BASE_PATH || '').trim()
const basePath = rawBasePath.length > 0 ? rawBasePath : undefined
const unoptimized = !!process.env.UNOPTIMIZED

/** @type {import('next').NextConfig} */
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    // Next 15: next build 만으로 out/ 생성 (output: 'export')
    output: isExport ? 'export' : undefined,

    // 커스텀 도메인(sumr.it)인 경우 BASE_PATH가 빈 문자열이므로
    // basePath/assetPrefix를 설정하지 않습니다.
    basePath,
    assetPrefix: basePath || undefined,

    reactStrictMode: true,
    trailingSlash: false,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

    eslint: { dirs: ['app', 'components', 'layouts', 'scripts'] },

    images: {
      remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
      unoptimized,
    },

    async headers() {
      return [{ source: '/(.*)', headers: securityHeaders }]
    },

    webpack: (config) => {
      config.module.rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] })
      return config
    },
  })
}

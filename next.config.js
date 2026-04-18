/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'zh', 'zh-TW'],
    defaultLocale: 'zh',
  },
}

module.exports = nextConfig
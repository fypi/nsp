const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  // 关键修复：添加 i18n 配置，让 Vercel 正确识别 [locale] 路由
  i18n: {
    locales: ["zh", "en", "zh-TW"],
    defaultLocale: "zh",
    localeDetection: false, // 关闭自动语言检测，避免路由混乱
  },
};

module.exports = nextConfig;
const path = require("path");

const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  output: "standalone", // 关键配置，强制生成静态路由
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
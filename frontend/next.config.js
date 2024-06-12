const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpackDevMiddleware: (config) => {
      config.watchOptions = {
        poll: 100,
        aggregateTimeout: 500,
        ignored: ["node_modules"],
      };
      return config;
    }
  }

  module.exports = nextConfig

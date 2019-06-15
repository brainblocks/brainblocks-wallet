require('dotenv').config()
const withOffline = require('next-offline')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

const nextConfig = {
  poweredByHeader: false,
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    RECAPTCHA_REQUIRED: process.env.RECAPTCHA_REQUIRED !== 'false',
    DEBUG: process.env.DEBUG,
    BASE_API_URL: process.env.BASE_API_URL,
    BASE_API_URL_SERVERSIDE: process.env.BASE_API_URL_SERVERSIDE,
    LOCAL_API: process.env.LOCAL_API,
    WEBSOCKET_URL: process.env.WEBSOCKET_URL,
    AUTH_TOKEN_COOKIE_KEY: process.env.AUTH_TOKEN_COOKIE_KEY
  },
  workboxOpts: {
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
        handler: 'cacheFirst'
      },
      { urlPattern: /^https?.*/, handler: 'networkFirst' }
    ]
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }
}

module.exports = withBundleAnalyzer(withOffline(nextConfig))

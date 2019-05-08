require('dotenv').config()
const withOffline = require('next-offline')

const nextConfig = {
  poweredByHeader: false,
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    DEBUG: process.env.DEBUG,
    BASE_API_URL: process.env.BASE_API_URL,
    LOCAL_API: process.env.LOCAL_API,
    WEBSOCKET_URL: process.env.WEBSOCKET_URL
  },
  workboxOpts: {
    runtimeCaching: [{ urlPattern: /^https?.*/, handler: 'networkFirst' }]
  }
}

module.exports = withOffline(nextConfig)

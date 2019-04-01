require('dotenv').config()

module.exports = {
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    DEBUG: process.env.DEBUG,
    BASE_API_URL: process.env.BASE_API_URL,
    LOCAL_API: process.env.LOCAL_API
  }
}

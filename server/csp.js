// Adapted from https://github.com/zeit/next.js/tree/canary/examples/with-strict-csp

const uuidv4 = require('uuid/v4')
const helmet = require('helmet')

const generateNonce = () => {
  return Buffer.from(uuidv4()).toString('base64')
}

module.exports = function useCsp(app) {
  // generate a nonce and add it to res.locals
  app.use(async (req, res, next) => {
    try {
      res.locals.nonce = await generateNonce()
      next()
    } catch (e) {
      next(e)
    }
  })

  const nonce = (req, res) => `'nonce-${res.locals.nonce}'`

  const scriptSrc = [nonce, "'strict-dynamic'", 'https:']

  // In dev we allow 'unsafe-eval', so HMR doesn't trigger the CSP
  if (process.env.NODE_ENV !== 'production') {
    scriptSrc.push("'unsafe-eval'")
  }

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        baseUri: ["'none'"],
        objectSrc: ["'none'"],
        defaultSrc: ["'self'"],
        frameSrc: [
          "'self'",
          'https://www.google.com',
          'https://www.gstatic.com'
        ],
        connectSrc: [
          "'self'",
          '*.brainblocks.io',
          'localhost:*',
          'http://127.0.0.1:*',
          'https://127.0.0.1:*',
          'ws://localhost:*',
          'ws://127.0.0.1:*',
          'webpack:',
          'https://fonts.googleapis.com',
          'https://robohash.org',
          'https://secure.gravatar.com',
          'https://www.google.com',
          'https://www.gstatic.com'
        ],
        scriptSrc,
        // styleSrc: [nonce, "'strict-dynamic'", 'https://fonts.googleapis.com'], // Helmet doesn't allow strict-dynamic. I don't think there is any XSS possibility with our inline styles anyway.
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: [
          "'self'",
          'data:',
          'https://robohash.org',
          'https://secure.gravatar.com'
        ]
      }
    })
  )
}

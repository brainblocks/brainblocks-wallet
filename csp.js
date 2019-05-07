// Adapted from https://github.com/zeit/next.js/tree/canary/examples/with-strict-csp

const crypto = require('crypto')
const helmet = require('helmet')

const generateNonce = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(48, function(err, buffer) {
      if (err) return reject(err)
      var token = buffer.toString('base64')
      resolve(token)
    })
  })
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

  const scriptSrc = [nonce, "'strict-dynamic'", "'unsafe-inline'", 'https:']

  // In dev we allow 'unsafe-eval', so HMR doesn't trigger the CSP
  if (process.env.NODE_ENV !== 'production') {
    scriptSrc.push("'unsafe-eval'")
  }

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        baseUri: ["'none'"],
        objectSrc: ["'none'"],
        defaultSrc: ["'self'", '*.brainblocks.io'],
        scriptSrc,
        // styleSrc: [nonce, "'strict-dynamic'", 'https://fonts.googleapis.com'], // Helmet doesn't allow strict-dynamic. I don't think there is any XSS possibility with our scripts anyway.
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: [
          "'self'",
          'https://robohash.org',
          'https://secure.gravatar.com'
        ]
      }
    })
  )
}

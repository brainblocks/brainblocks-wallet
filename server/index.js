require('dotenv').config()

const { join } = require('path')
const next = require('next')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const proxy = require('http-proxy-middleware')
const useCsp = require('./csp')
const { login, register } = require('./auth-api')
const { setAuthCookie } = require('./cookie')

const port = parseInt(process.env.PORT, 10) || 3000
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  app.use(compression())
  app.use(helmet())
  app.use(
    helmet.referrerPolicy({
      policy: 'same-origin'
    })
  )
  useCsp(app)

  // Proxy the login and register requests to the
  // API server, but add the auth token cookie on the response
  app.use(
    ['/api/auth', '/api/users'],
    proxy({
      target: process.env.BASE_API_URL.replace('/api', ''),
      onProxyRes: function(proxyRes, req, res) {
        // https://github.com/nodejitsu/node-http-proxy#modify-response
        proxyRes.on('data', function(buf) {
          const json = buf.toString()
          const data = JSON.parse(json)
          if (data.token) {
            setAuthCookie(res, data.token)
          }
        })
      }
    })
  )

  app.get('/service-worker.js', (req, res) => {
    const filePath = join(__dirname, '.next', '/service-worker.js')
    nextApp.serveStatic(req, res, filePath)
  })
  /*
  app.post('/api/auth', async (req, res, next) => {
    let response
    try {
      response = await login(req.body)
    } catch (err) {
      // Should I send the error response myself here?
      // I should be able to get the status and message
      // straight out of `response` and otherwise default
      // to 500 generic error
      console.error('Error in /api/login', err)
      next(err)
    }

    // Set the cookie
    setAuthCookie(res, response.data.token)

    res.status(200).send(response.data)
  })

  //app.post('/api/register', (req, res) => {})
*/
  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

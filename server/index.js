require('dotenv').config()

const { join } = require('path')
const next = require('next')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const useCsp = require('./csp')
const proxy = require('http-proxy-middleware')
const { setAuthCookie, deleteAuthCookie } = require('./cookie')

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

  app.use(
    ['/local-api/auth', '/local-api/users'],
    proxy({
      target: process.env.BASE_API_URL_SERVERSIDE,
      pathRewrite: function(path) {
        return path.replace('/local-api', '')
      },
      onProxyRes: function(proxyRes, req, res) {
        if (req.method === 'POST' && ['/auth', '/users'].includes(req.path)) {
          // login
          // https://github.com/nodejitsu/node-http-proxy#modify-response
          proxyRes.on('data', function(buf) {
            const json = buf.toString()
            const data = JSON.parse(json)
            if (data.token) {
              setAuthCookie(res, data.token)
            }
          })
        } else if (req.method === 'DELETE' && req.path === '/auth') {
          // logout
          deleteAuthCookie(res, req.headers['x-auth-token'])
        }
      }
    })
  )

  app.get('/service-worker.js', (req, res) => {
    const filePath = join(__dirname, '../.next', '/service-worker.js')
    nextApp.serveStatic(req, res, filePath)
  })

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, err => {
    if (err) throw err
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`)
  })
})

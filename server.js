const { join } = require('path')
const next = require('next')
const express = require('express')
const helmet = require('helmet')
const useCsp = require('./csp')

const port = parseInt(process.env.PORT, 10) || 3000
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  app.use(helmet())
  app.use(
    helmet.referrerPolicy({
      policy: 'same-origin'
    })
  )
  useCsp(app)

  app.get('/service-worker.js', (req, res) => {
    const filePath = join(__dirname, '.next', '/service-worker.js')
    nextApp.serveStatic(req, res, filePath)
  })

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })

  /*
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    // handle GET request to /service-worker.js
    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname)

      nextApp.serveStatic(req, res, filePath)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, () => {
    console.log(`> Ready on http://localhost:${3000}`)
  })
  */
})

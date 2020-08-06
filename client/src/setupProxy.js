

import proxy from 'http-proxy-middleware'

export let developMiddleware = app => {
  app.use(
    '/graphql',
    proxy({
      target: 'http://localhost:5000'
    })
  )
}
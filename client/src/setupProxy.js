const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    '/auth/signup',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  )
}
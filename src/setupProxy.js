const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/v2',
    createProxyMiddleware({
      //target: 'http://3.39.44.40:8089',
      target: 'http://localhost:8089',
      changeOrigin: true,
      // pathRewrite를 제거해서 /api/v2 경로 그대로 전달
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://3.39.44.40:8088',
      changeOrigin: true,
      // pathRewrite를 제거해서 /api 경로 그대로 전달
    })
  );
};
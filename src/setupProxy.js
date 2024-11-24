const {createProxyMiddleware} = require('http-proxy-middleware');

const API_TARGET =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:8088/api' // 운영 환경
    : 'http://3.39.44.40:8088/api'; // 개발 환경

module.exports = function (app) {
  app.use(
    '/api/v2',
    createProxyMiddleware({
      //target: 'http://3.39.44.40:8089',
      target: 'http://localhost:8089/api/v2',
      changeOrigin: true,
      // pathRewrite를 제거해서 /api/v2 경로 그대로 전달
    })
  );

  app.use(
    '/api',
    createProxyMiddleware({
      target: API_TARGET,
      changeOrigin: true,
      // pathRewrite를 제거해서 /api 경로 그대로 전달
    })
  );
};
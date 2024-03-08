const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://52.78.35.193:8080",
      changeOrigin: true,
    })
  );
};
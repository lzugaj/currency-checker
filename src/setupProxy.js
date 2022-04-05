const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
	target: "https://api.hnb.hr",
	changeOrigin: true
}

module.exports = function(app) {
	app.use(
		"/tecajn/v1",
		createProxyMiddleware(proxy)
	);
};
const http = require("http");
const server = http.createServer((req, res) => {
  res.write("im alive");
  res.end();
});
server.listen(5000, "0.0.0.0", () => {
  console.log(chalk.cyan("🌐 Keep-alive server running on http://0.0.0.0:5000"));
  console.log(chalk.cyan("📍 Use this URL for Uptime Robot monitoring"));
});

module.exports = server;

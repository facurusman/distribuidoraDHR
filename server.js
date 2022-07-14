const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/dhr-fe'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/dhr-fe/index.html'));});
app.listen(process.env.PORT || 8080);

const http = require('http');

process
  .on('SIGTERM', shutdown('SIGTERM'))
  .on('SIGINT', shutdown('SIGINT'))
  .on('uncaughtException', shutdown('uncaughtException'));

setInterval(console.log.bind(console, 'tick'), 1000);
http.createServer((req, res) => res.end('hi'))
  .listen(process.env.PORT || 3000, () => console.log('Listening'));

function shutdown(signal) {
  return (err) => {
    console.log(`${ signal }...`);
    if (err) console.error(err.stack || err);
    setTimeout(() => {
      console.log('...waited 5s, exiting.');
      process.exit(err ? 1 : 0);
    }, 5000).unref();
  };
}

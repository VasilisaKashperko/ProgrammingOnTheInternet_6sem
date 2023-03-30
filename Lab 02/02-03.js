const http = require('http')
const fs = require('fs');

const hostname = 'localhost';
const port = 5000;

const server = http.createServer((req, res) => {
    if (req.url === '/api/name' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        const lastName = 'Certified';
        const middleName = 'Cutie';
        res.end(`${lastName} ${middleName}`);
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found');
      }
  });


server.listen(port, hostname, () => {
    console.log(`Server is running here: http://${hostname}:${port}/api/name :)`);
})
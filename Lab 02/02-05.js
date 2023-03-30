const http = require('http')
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {
    if (req.url === '/api/name' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        const lastName = 'Certified';
        const middleName = 'Cutie';
        res.end(`${lastName} ${middleName}`);
      }
    else if(req.url === '/fetch' && req.method === 'GET') {
        fs.readFile('fetch.html', (err, data) => {
            if (err) {
              // If there was an error reading the file, send a 500 error response
              res.statusCode = 500;
              res.setHeader('Content-Type', 'text/plain');
              res.end('Internal Server Error');
              console.log("not working")
            } else {
              // If the file was read successfully, send its contents as the response body
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/html');
              res.end(data);
            }
          });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found');
    }
      
  });


server.listen(port, hostname, () => {
    console.log(`Server is running here: http://${hostname}:${port}/fetch :)`);
})
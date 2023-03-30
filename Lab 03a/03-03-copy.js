const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 5000;

function fibonacci(n) {
  if (n <= 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${hostname}:${port}`);

  if (url.pathname === '/') {
    const filePath = path.join(__dirname, '03-03-copy.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (url.pathname === '/fib') {
    const n = parseInt(url.searchParams.get('n'));

    if (!isNaN(n)) {
      const fib = fibonacci(n);
      const response = { n, fib };
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    } else {
      res.statusCode = 400;
      res.end('Invalid request parameter');
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});

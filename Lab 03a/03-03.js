const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 5000;

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${hostname}:${port}`);

  if (url.pathname === '/') {
    const filePath = path.join(__dirname, '03-03.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (url.pathname === '/fact') {
    const k = parseInt(url.searchParams.get('k'));

    if (!isNaN(k)) {
      const fact = factorial(k);
      const response = { k, fact };
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
  console.log(`Server is running at http://${hostname}:${port}`);
});
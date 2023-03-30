const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 5000;

function factorial1(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial1(n - 1);
    }
}

function factorial2(n, callback) {
    if (n === 0 || n === 1) {
      process.nextTick(() => callback(1));
    } else {
      process.nextTick(() => factorial2(n - 1, (result) => {
        callback(n * result);
      }));
    }
}

  function factorial3(n, callback) {
    if (n === 0 || n === 1) {
      setImmediate(() => callback(1));
    } else {
      setImmediate(() => factorial3(n - 1, (result) => {
        callback(n * result);
      }));
    }
}

  

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${hostname}:${port}`);
  const k = parseInt(url.searchParams.get('k'));

  if (url.pathname === '/') {
    const filePath = path.join(__dirname, 'testing.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
    } else if (url.pathname === '/fact1' && !isNaN(k)) {
        const fact = factorial1(k);
        const response = { k, fact };
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    } else if (url.pathname === '/fact2' && !isNaN(k)) {
        factorial2(k, (fact) => {
            const response = { k, fact };
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        });
    } else if (url.pathname === '/fact3' && !isNaN(k)) {
        factorial3(k, (fact) => {
            const response = { k, fact };
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
          });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
    console.log(`Server is running here: http://${hostname}:${port}/ :)`);
});
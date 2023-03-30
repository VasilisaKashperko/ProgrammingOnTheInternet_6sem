const http = require('http')

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
  const k = parseInt(url.searchParams.get('k'));

  if (url.pathname === '/fact' && !isNaN(k)) {
    const fact = factorial(k);
    const response = { k, fact };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
    console.log(`Server is running here: http://${hostname}:${port}/fact?k=3 :)`);
});
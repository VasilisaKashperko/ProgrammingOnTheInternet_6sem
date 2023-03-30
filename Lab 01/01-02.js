const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) =>
{
    let body = '';

    req.on('data', chunk => {
        body += chunk
    });

    res.writeHead(200, {'Content-Type': 'text/html'});

    req.on('end', () => {
        let headersHtml = ''
        for (field in req.headers) {
          headersHtml += `<h3>Header ${field}: ${req.headers[field]}</h3>`
        };

        res.end(`
            <h1>Request method: ${req.method}</h1>
            <h1>Request url: ${req.url}</h1>
            <h1>Request body: ${body}</h1>
            ${headersHtml}
        `);
     });
});

server.listen(port, hostname, () => {
    console.log('Server is running here: http://localhost:3000/ :)');
});
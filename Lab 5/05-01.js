const http = require('http');
const fs = require('fs');

const host = '127.0.0.1';
const port = '8000';

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile("index.html", (err, data) => {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(data);
        })}
     if(req.method === 'POST' && req.url === '/sendMess'){
        console.log('Post')
        let data = '';
        req.on('data', chunk => {
          data += chunk;
        })
        req.on('end', () => {
            data = JSON.parse(data)
            const message = {        
                to: data['to'],
                subject: 'Новое сообщение!',
                text: data['message']
            }
            res.end(send(data['from'], "", message));
        })
    }
})

server.listen(port, host, ()=>{
    console.log('Сервер работает :) ' + host + ':' + port);
});
const http = require('http')
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {
    // Read the contents of the index.html file
    fs.readFile('cat.jpg', (err, data) => {
      if (err) {
        // If there was an error reading the file, send a 500 error response
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
        console.log("not working")
      } else {
        // If the file was read successfully, send its contents as the response body
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/jpeg');
        res.end(data);
      }
    });
  });


server.listen(port, hostname, () => {
    console.log(`Server is running here: http://${hostname}:${port}/ :)`);
})
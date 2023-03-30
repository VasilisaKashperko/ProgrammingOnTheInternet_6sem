const http = require('http');
const readline = require('readline');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 5000;

let state = 'norm';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  const html = `
    <html>
      <head>
        <title>Application State</title>
      </head>
      <body>
        <h1>Application State: ${state}</h1>
      </body>
    </html>
  `;

  res.end(html);
});

server.listen(port, hostname, () => {
  console.log(`Server is running here: http://${hostname}:${port}/ :)`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.setPrompt(`${state.toLowerCase()}->`);
  rl.prompt();

  rl.on('line', (line) => {
    line = line.trim();

    if (line === 'exit') {
      console.log('Exiting...');
      process.exit(0);
    }

    if (['norm', 'stop', 'test', 'idle'].includes(line)) {
      const previousState = state;
      state = line;
      rl.setPrompt(`${state.toLowerCase()}->`);
      console.log(`reg = ${previousState}--> ${state}`);
      rl.prompt();
    } else {
      console.log(`Invalid state: ${line}`);
      rl.prompt();
    }
  });
});
import net from 'net';

const host = '127.0.0.1',
port = '8000';

const server = net.createServer().listen(port, host, ()=>{
    console.log(`Сервер работает :) ${host}:${port}`);
});

server.on('connection', (sock)=>{
    console.log(`Пользователь подключен (${sock.remoteAddress}:${sock.remotePort})`);

    sock.on('data', (data)=>{
        console.log(`ECHO: ${data}`)
    })
    sock.on('close', ()=>{
console.log(`Пользователь отключен (${sock.remoteAddress}:${sock.remotePort})`)
    })
    sock.on('error', (e)=>{
        console.log(`Ошибка: ${e.message}`);
        sock.destroy();
    })
})
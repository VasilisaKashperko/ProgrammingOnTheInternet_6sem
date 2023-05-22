import udp from 'dgram';

const port = 3000;

let server = udp.createSocket('udp4');

server.on('error', (err)=>{
    console.log(`ERROR: ${err}`);
    server.close;
})

server.on('message', (msg, info)=>{
    console.log(`Сервер получил от клиента сообщение: ${msg.toString()} `);
    console.log(`Сервер получил ${msg.length} байтов от ${info.address}: ${info.port}`);
        server.send(msg, info.port, info.address, (err)=>{
            if(err){server.close();}
            else {console.log('Сервер отправил данные клиенту');}
        });
});

server.on('listening',()=>{
    console.log(`Сервер слушает порт: ${server.address().port}`);

    console.log(`Сервер IP: ${server.address().address}`);

    console.log(`Сервер (IP4/IP6): ${server.address().family}`);
})

server.on('close', ()=>{console.log('Сервер: сокет закрыт')})
server.bind(port);
import buffer from 'buffer';
import udp from 'dgram';

const client = udp.createSocket('udp4'),
port = 3000;

client.on('message', (msg,info)=>{

    console.log('Клиент получил от сервера сообщение: ' + msg.toString());

    console.log(`Клиент получил ${msg.length} байтов от ${info.address}:${info.port}`)
});

let data = Buffer.from('Клиент: сообщение 1');
    client.send(data, port, 'localhost', (err)=>{
        if(err) client.close();

        else console.log('Клиент отправил сообщение серверу');
});

let data1 = Buffer.from('Vasilisa');
let data2 = Buffer.from(' Kashperko');

client.send([data1, data2], port, 'localhost', (err)=>{
    if(err)client.close();

    else console.log('Клиент отправил сообщение серверу');
});
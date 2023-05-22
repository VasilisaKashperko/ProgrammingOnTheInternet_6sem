import net from 'net';

let HOST = '127.0.0.1';
let PORT = process.argv[2]?process.argv[2]:4000;
let client = new net.Socket();
let buf = Buffer.alloc(4);
let timerId = null;

let k = process.argv[3]?process.argv[3]: 0 ;


client.connect(PORT, HOST, ()=>{
    console.log('Клиент подключен: '+client.remoteAddress + ':' + client.remotePort);

    timerId = setInterval(()=>{
        client.write((buf.writeInt32LE(k, 0), buf));
    }, 1000);

    setTimeout(()=>{
        clearInterval(timerId);
        client.end();
    }, 20000);
});

client.on('data', (data)=>{console.log('Данные клиента: ', data.toString());});

client.on('close', ()=>{console.log('Клиент отключен');});

client.on('error', (e)=>{console.log('Ошибка клиента: ' + e);});
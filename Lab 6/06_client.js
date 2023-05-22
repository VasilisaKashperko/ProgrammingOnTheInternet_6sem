import net from 'net';

const client = new net.Socket();
const port = 8000;
const host = '127.0.0.1';

client.connect(port, host, function() {
    console.log('Подключено');
    client.write("Это клиент передает привет для " + client.address().address);

        client.on('close', function() {
            console.log('Соединение закрыто');
            });

        client.on('error', (e)=>{
            console.log(e.message)
        })
});
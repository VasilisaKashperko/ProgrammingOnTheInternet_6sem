import net from 'net';
const HOST = '127.0.0.1';
const PORT1 = 4000;
const PORT2 = 5000;
let h;

let timerId;
h = n => {
    return sockets => {
        let sum = 0;
        console.log(`ПОДКЛЮЧЕНО  ${n}:  ` +sockets.remoteAddress +':'+sockets.remotePort);
       
            sockets.on('data', data => {
                sum += 1;
                console.log(`Данные ${n}: ${sum}`);
            })

            timerId = setInterval(()=>{
                sockets.write('ECHO: ' + sum);
       
        }, 5000);

        setTimeout(()=>{
            clearInterval(timerId);          
        }, 20000);
      
      
 
        sockets.on('closed', () => { console.log(`CLOSED${n}`+sockets.remoteAddress +' '+sockets.remotePort); 
    sum = 0;})
        sockets.on('error', error => { console.log(`ERROR${n}: ${error.message}`); });
    }
}


net.createServer(h(PORT1)).listen(PORT1, HOST).on('listening', () => { console.log(`TCP-сервер: ${HOST}:${PORT1}`) });
net.createServer(h(PORT2)).listen(PORT2, HOST).on('listening', () => { console.log(`TCP-сервер: ${HOST}:${PORT2}`) });
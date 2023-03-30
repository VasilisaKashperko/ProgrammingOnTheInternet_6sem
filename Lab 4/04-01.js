const http  = require('http');

const fs = require('fs');
const url = require('url');

const DB = require('./DB');

http.createServer((req,res)=> {
    if(req.url == '/') {
        let html = fs.readFileSync('./04-01.html')
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.end(html)
    }
    else if(url.parse(req.url).pathname === '/api/db') {
        DB.emit(req.method, req, res)
    }
}).listen(5001, '127.0.0.1', () => {
    console.log("Сервер запущен!");
});

DB.on("GET",(req,res)=> {
    DB.select().then((data) => {
        res.end(JSON.stringify(data));
    } );

});


DB.on("POST",(req,res)=> {
    let block
     req.on('data', (data)=>{
        block = JSON.parse(data);
       
     })
     req.on('end', () => {
        DB.insert(block).then( (block)=> { res.end(JSON.stringify(block));})
        .catch((errorMessage) => {
            res.statusCode = 400;
            return res.end(errorMessage);
        });;
    })
});

DB.on("PUT",(req,res)=> {
    req.on("data", (data)=> {
        var block = JSON.parse(data);
        DB.update(block).then(block => { res.end(JSON.stringify(block));});
    })

});

DB.on("DELETE",(req,res)=> {
    if(typeof url.parse(req.url,true).query.id != 'undefined' ){
        var id = parseInt(url.parse(req.url,true).query.id);
        if(Number.isInteger(id)){
            res.writeHead(200,{'Content-Type':'application/json; charset=utf-8'});
            DB.delete(id).then(ID => {  res.end(JSON.stringify(ID)); }); 
        }
    }
});
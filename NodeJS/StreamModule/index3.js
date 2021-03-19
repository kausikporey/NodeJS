const http = require('http');
const fs = require('fs');

const server = http.createServer();
server.on("request",(req,res) => {
const rstream = fs.createReadStream('./StreamModule/input.txt');
rstream.pipe(res);
});

server.listen(8000,'127.0.0.1',() => {
    console.log('Listening through the port number 8000')
});
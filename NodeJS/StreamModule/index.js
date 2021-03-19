const http = require('http');
const fs = require('fs');

const server = http.createServer();
server.on("request",(req,res) => {
    fs.readFile("./StreamModule/input.txt","utf-8",(err,data) => {
        if(err)return console.error(err);
        res.end(data);
    });
});

server.listen(8000,'127.0.0.1',() => {
    console.log('Listening through the port number 8000')
})
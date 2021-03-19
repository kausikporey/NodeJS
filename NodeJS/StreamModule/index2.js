const http = require('http');
const fs = require('fs');

const server = http.createServer();
server.on("request",(req,res) => {
const rstream = fs.createReadStream("./StreamModule/inputs.txt");
rstream.on("data",(chunkdata) => {
    res.write(chunkdata);
  });
rstream.on("end",() => {
    res.end();
  });
rstream.on("error",(err) => {
    res.end("File Not Found");
  });
});

server.listen(8000,'127.0.0.1',() => {
    console.log('Listening through the port number 8000')
});
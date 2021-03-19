const http = require('http');
const server = http.createServer((req,res) => {
    if(req.url == "/"){
        res.end("Hello From the Home Page.");
    }
    else if(req.url == "/contactus"){
        res.end("Hello From the Contactus Page.");
    }
    else if(req.url == "/aboutus"){
        res.end("Hello From the AboutUS Page.");
    }
    else{
        res.writeHead(404,{"content-type" : "text/html"});
        res.end("<h1>404 Error! Page Not Found in the server.<h1>");
    }
});

server.listen(8000,'127.0.0.1',() => {
    console.log("Listenning through the port number 8000.....");
});
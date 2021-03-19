const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
    const data = fs.readFileSync(`${__dirname}/data.json`,"utf-8");
    const objdata = JSON.parse(data);


    if(req.url == "/"){
        res.end("Hello From the Home Page.");
    }
    else if(req.url == "/contactus"){
        res.end("Hello From the Contactus Page.");
    }
    else if(req.url == "/aboutus"){
        res.end("Hello From the AboutUS Page.");
    }

    else if(req.url == "/userapi"){
        res.writeHead(200,{"contant-type" : "application/json"});
        res.end(objdata.name);
    }

    else{
        res.writeHead(404,{"content-type" : "text/html"});
        res.end("<h1>404 Error! Page Not Found in the server.<h1>");
    }
});


server.listen(8000,'127.0.0.1',() => {
    console.log("Listenning through the port number 8000.....");
});
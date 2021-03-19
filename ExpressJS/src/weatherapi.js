const requests = require('requests');
const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send("<h1>I am from home page.<h1>")
});
app.get('/about',(req,res) => {
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.name}&appid=a9404a7b2f20bb6b2becb78307fbcaac`).on("data",(chunk) => {
        const objdata = JSON.parse(chunk);
        const arrdata = [objdata];
        console.log(`City Name is  : ${arrdata[0].name} and Temperature is : ${arrdata[0].main.temp}`);
        res.write(arrdata[0].name);
    }).on("end",(err) => {
        if(err) return console.log("connection close due to error.",err);
        res.end();
    });
});
app.get('/contact',(req,res) => {
    res.send("<h1>I am from contact page.<h1>");
});
app.get('*',(req,res) => {
    res.send("<h1>404 error page.<h1>");
});

app.listen(8000,() => {
    console.log("Litenning through the port number 8000...........");
});
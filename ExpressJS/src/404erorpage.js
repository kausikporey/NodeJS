const express = require('express');
const app = express();

app.get('/',(req,res) => {
    res.send("I am from home page.")
});
app.get('/about',(req,res) => {
    res.send("<h1>I am from about page.<h1>");
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
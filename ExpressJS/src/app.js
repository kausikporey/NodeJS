const express = require('express');
const app = express();
const data = [{id:1,name:'kausik',roll:101},{id:2,name:'dhruba',roll:115}];

app.get("/",(req,res) => {
    res.send("Hello From the Home Page.")
});
app.get("/aboutus",(req,res) => {
    res.status(200).send("Hello from the about us page.");
});
app.get("/contactus",(req,res) => {
    res.write('<h1>Hello from the about us page.<h1>');
    res.write('<h2>I am kousik porey.<h2>');
    res.send();
});
app.get("/data",(req,res) => {
    res.send(data[0].id);
});

app.listen(8000,() => {
    console.log("Listening through the port number 2000.");
});
const express = require('express');
const app = express();
app.use(express.static("C:/Users/kousi/Desktop/NodeJS/ExpressJS/public"));

app.listen(8000,() =>  {
    console.log("Listening through the port number 8000......");
});
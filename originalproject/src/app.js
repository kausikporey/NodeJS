require('dotenv').config();
require("c:/Users/kousi/Desktop/NodeJS/originalproject/db/conn.js");
const express = require("express");
const app = express();
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Registration = require("c:/Users/kousi/Desktop/NodeJS/originalproject/models/schema.js");
const auth = require("c:/Users/kousi/Desktop/NodeJS/originalproject/middleware/auth.js");



const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");
const port = process.env.PORT || 8000;




app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.set(express.json());
app.set("view engine","hbs"); 
app.set("views",template_path);
hbs.registerPartials(partial_path);




app.post("/registerpost",async(req,res) => {
    try{
    const registerEmployee = new Registration({
                            email:`${req.body.email}`,
                            name : `${req.body.name}`,
                            password: `${req.body.psw}`
                        })
    console.log(`Before sava to database: ${registerEmployee}`);                    

    const token = await registerEmployee.generateAuthToken();
    console.log(`Token : ${token}`);
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+300000),
        httpOnly: true   //this actually for user cannot delete the cookie
    })
    const registered = await registerEmployee.save();
    res.status(201).render("index");
    }catch(err){
        console.log(err);
        res.render("register")
    }
});



app.post("/loginpost",async(req,res) => {
    try{
            const email = req.body.email;
            const password = req.body.psw;
            const usermail = await Registration.findOne({email:email});
            console.log(usermail);
            const isMatch = await bcrypt.compare(password,usermail.password);
            console.log(isMatch);
            if(isMatch){
                const token = await usermail.generateAuthToken();
                res.cookie("jwt",token,{
                    expires:new Date(Date.now()+300000),
                    httpOnly: true   //this actually for user cannot delete the cookie
                })
                res.status(200).render("index");
                console.log(`Token : ${token}`);
            }else{
                res.send("Invalid Login Details.");
             }
       }catch(err){
                    res.status(400).send("Invalid Login details");
                    console.log("Invalid Login Details");
                  }
});





app.get("/secret",auth,(req,res) => {
    res.render("secret");
    console.log(`This is the cookie : ${req.cookies.jwt}`);
})

app.get("/",(req,res) => {
    res.render("register");
})
0
app.get("/login",(req,res) => {
    res.render("login");
})
app.get("/logout",auth,async(req,res) => {
    try{
        console.log(req.user);
        req.user.tokens = req.user.tokens.filter((currentelement) => {
                return currentelement.token !=  req.token;               //one cookie from a user will be deleted only from the database
        })
        req.user.tokens = [];    //delete all the cookie from the database
        res.clearCookie("jwt");
        console.log("logout Successful");
        await req.user.save();
        res.render("login");
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})

app.get("/register",(req,res) => {
    res.render("register");
})










app.listen(port,() => {
    console.log(`listening through the port number ${port}`);
})      
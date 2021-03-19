require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Student = require("c:/Users/kousi/Desktop/NodeJS/Project2/models/schema.js");
require("c:/Users/kousi/Desktop/NodeJS/Project2/db/conn.js");
const port = process.env.PORT || 8000;

//console.log(process.env.SECRET_KEY);

app.set(express.json());  //to show the express that our registration data from client side is in json format
app.use(express.urlencoded({extended:true}));  //to get the registration and login from data as a string
app.use(cookieParser());      //to get the cookies value from client

const static_path = path.join(__dirname,"../public/index");
const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");
//app.use(express.static(static_path));  //use the static html page inside public folder
app.set("view engine","hbs"); //inform the express that i am using hbs as a template engine
app.set("views",template_path);
hbs.registerPartials(partial_path);

const securePassword = async(password) => {
    const hashpassword = await bcrypt.hash(password,10);
    return hashpassword;
}  

const generateToken = async(id) => {
    const token = jwt.sign({_id:`${id}`},"abjfhsfkjhfkurejhrjhfhjfkjhfkjh");
    return token;
}

app.get("/",(req,res) => {
    res.render("register");
})

app.post("/registerpost",async(req,res) => {
    try{
    const password = `${req.body.psw}`;
    const securepassword = await securePassword(password);
    const user =new Student({
                            email:`${req.body.email}`,
                            name : `${req.body.name}`,
                            password: `${securepassword}`
                        })
    const userdata = await user.save();
    const id = userdata._id.toString();
    const token = await generateToken(id);
    console.log(token);
    res.cookie("jwt",token,{
            expires:new Date(Date.now()+3000000),
            httpOnly:true
    });
    //console.log(req.cookies.jwt);  //to get the cookies value that i have set in the browser
    const tokendata = await Student.findByIdAndUpdate({_id:id},{$set:{token:token}},{new:true});
    res.render("index");
    console.log(tokendata);
    }catch(err){
        console.log("Data Insertion Failed");
        res.end();
    }
});

app.post("/loginpost",async(req,res) => {
    try{
    const password = `${req.body.psw}`;    
    //const result = bcrypt.compare(password,hashpassword);    
    const result = await Student.find({email : `${req.body.email}`});
    if(!result == false){
    const pass = await result[0].password;
    const compare = await bcrypt.compare(password,pass);
            if(compare == true){
                const id = result[0]._id.toString();
                const token = await generateToken(id);
                console.log(token);
                res.cookie("jwt",token,{
                    expires:new Date(Date.now()+3000000),
                    httpOnly:true
                 });
                console.log("Login Successful.");
                res.status(200).render("index");
    }else{
      console.log('Email or password Does not matches');
      res.render("login");
         }
 }
}catch(err){
    res.status(400).send("Internal Error");
    console.log(err);
}
});

app.get("/login",(req,res) => {
    res.render("login");
})

app.get("/register",(req,res) => {
    res.render("register");
})




app.listen(port,() => {
    console.log(`listening through the port number ${port}`);
})      
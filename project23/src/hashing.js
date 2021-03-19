const express = require("express");
const app = express();
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const Student = require("c:/Users/kousi/Desktop/NodeJS/Project2/models/schema.js");
require("c:/Users/kousi/Desktop/NodeJS/Project2/db/conn.js");
const port = process.env.PORT || 8000;

app.set(express.json());
app.use(express.urlencoded({extended:true}))

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
app.get("/",(req,res) => {
    res.render("register");
})

app.post("/register",async(req,res) => {
    try{
    const password = `${req.body.psw}`;
    const securepassword = await securePassword(password);
    const user =new Student({
                            email:`${req.body.email}`,
                            name : `${req.body.name}`,
                            password: `${securepassword}`
                        })
    const userdata = await user.save();
    res.render("index");
    console.log(userdata);
    }catch(err){
        res.render("register");
        res.status(400).send("Data Insertation Failed");
        console.log("Data Insertion Failed");
    }
});

app.post("/login",async(req,res) => {
    try{
    const password = `${req.body.psw}`;    
    //const result = bcrypt.compare(password,hashpassword);    
    const result = await Student.find({email : `${req.body.email}`});
    console.log(result)
    if(!result == false){
    const pass = await result[0].password;
    const compare = await bcrypt.compare(password,pass);
            if(compare == true){
                console.log("Login Successful.");
                console.log(result);
                res.status(200).render("index");
            }
    }else{
      console.log('Email Does not matches');
      res.render("login");
  }
}catch(err){
    res.status(400).send("Internal Error")
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
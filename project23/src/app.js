const express = require("express");
const app = express();
const path = require('path');
const hbs = require('hbs');
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
    console.log(hashpassword);
    return hashpassword;
}  
app.get("/",(req,res) => {
    res.render("register");
})

app.post("/register",async(req,res) => {
    try{
    const user =new Student({
                            email:`${req.body.email}`,
                            name : `${req.body.name}`,
                            password: `${req.body.psw}`
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
    const result = await Student.find({$and:[{email:`${req.body.email}`},{password:`${req.body.psw}`}]});
    if(result == false){
        console.log("No data matches.");
        res.render("login");
    }else{
        console.log("data matches with database");
        res.status(200).render("index");
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
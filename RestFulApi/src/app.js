const express = require('express');
const app = new express();
require('./db/conn.js');
const Student = require('./models/students.js');

const port = process.env.port || 8000;

app.use(express.json());

//create new students
// app.post("/students",(req,res) => {
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(() => res.status(201).send(user)).catch((err) => res.status(400).send(err));
// })

//create new students
app.post("/students",async(req,res) => {
    try{
        const user = new Student(req.body);
        const newUser = await user.save();
        console.log(newUser);
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
})

//get the information of all student
app.get("/students",async(req,res) => {
    try{
    const data = await Student.find();
    res.status(200).send(data);
    console.log(data);
    }catch(err){
        res.send(err);
    }
})

//get the information of one student
app.get("/students/:name",async(req,res) => {
    try{
        const name = req.params.name;
        const studentdata = await Student.find({name:name});
        if(studentdata){
            res.status(200).send(studentdata);
            console.log(studentdata);
        }else{
            res.status(400).send();
        }
    }catch(err){
        res.send(err);
    }
})

//update the information of one student
app.patch("/students/:_id",async(req,res) => {
    try{
        const _id = req.params._id;
        const studentdata = await Student.findByIdAndUpdate(_id,req.body,{new:true});
        if(studentdata){
            res.status(200).send(studentdata);
            console.log(studentdata);
        }else{
            res.status(400).send();
        }
    }catch(err){
        res.send(err);
    }
})

//delete the information of one student
app.delete("/students/:id",async(req,res) => {
    try{
        const id = req.params.id;
        const studentdata = await Student.findByIdAndDelete({_id:id});
        if(studentdata){
            res.status(200).send(studentdata);
            console.log(studentdata);
        }else{
            res.status(400).send();
        }
    }catch(err){
        res.send(err);
    }
})



app.listen(port,() => {
    console.log(`connection is set up at port ${port}`);
})
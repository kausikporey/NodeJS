const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema({
    name:{type:String,required:true,minlength:3},
    email:{type:String,unique:[true,"Email already registered"],reuired:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Email Id Invalid.")
                }
             }
        },
    phone:{type:Number,minlength:10,maxlenght:10,required:true},
    address:{type:String,required:true}
    });

const Student = new mongoose.model("Student",schema);
module.exports = Student;
require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
    name:{type:String,required:true,minlength:3},
    email:{type:String,unique:[true,"Email already registered"],reuired:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Email Id Invalid.")
                }
             }
        },
    password:{type:String,required:true},
    tokens:[{token:{type:String,required:true}}]
    });

schema.methods.generateAuthToken = async function(){
    try{
            
            console.log(process.env.SECRET_KEY);
            const token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({token:token});
            await this.save();
            return token;
    }catch(err){
            console.log(err)
    }
}    

schema.pre("save",async function(next){                //save is a event so we use here pre
    if(this.isModified("password")){
    console.log(`the current password : ${this.password}`);
    this.password = await bcrypt.hash(this.password,10);
    console.log(`the current password : ${this.password}`);
    }
    next();   //without next this function will not end and will not go to the next step
})    

const Registration = new mongoose.model("Registration",schema);
module.exports = Registration;
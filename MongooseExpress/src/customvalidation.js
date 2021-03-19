const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect("mongodb://localhost:27017/database",{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
.then( () => console.log('Connection Successful.'))
.catch((err) => console.log(err));

const playlistSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    ctype:String,
    videos:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error("videos could not be negative");
            }
        }
    },
    author:String,
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    active:Boolean,
    date:{type:Date,default:Date.now}
})

const Playlist = new mongoose.model("Playlist",playlistSchema);  //create a collection named playlists


const createdocument = async() =>{
try{    
    const mongoosePlaylist = new Playlist({
        name:"Mango",
        ctype:"Database",
        videos:50,
        author:"kausik porey",
        email:"kousikporey1997@gmail.con",
        active:true
    })
    const result = await Playlist.insertMany([mongoosePlaylist]);
    console.log(result);
}catch(err){
    console.log(err);
 }
}

createdocument();
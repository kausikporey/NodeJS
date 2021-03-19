const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/database",{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => console.log('Connection Successful.'))
.catch((err) => console.log(err));

const playlistSchema = new mongoose.Schema({
    name:{type:String,
        required:true,   //name is mandatory in all the document you want to create
        unique:true,     //all name is unique
        lowercase:true,  //all name in the document will be lowercase,if you give uppercase it will automatically convert it to lowercase
        trim:true ,       //this will cut extra spasec in the name
        minlength:[4,"minimum letter should be 4"],      //length will be minimum 4
        maxlength:12
    },
    ctype:{
        type:String,
        lowercase:true,
        required:true,
        enum:["frontend","backend","database"]
    },
    videos:Number,
    author:String,
    active:Boolean,
    date:{type:Date,default:Date.now}
})

const Playlist = new mongoose.model("Playlist",playlistSchema);  //create a collection named playlists


const createdocument = async() =>{
try{    
    const mongoPlaylist = new Playlist({
        name:"Mongo",
        ctype:"Databas",
        videos:60,
        author:"kausik porey",
        active:true
    })
    const mongoosePlaylist = new Playlist({
        name:"Mongoose",
        ctype:"Database",
        videos:50,
        author:"kausik porey",
        active:true
    })
    const expressPlaylist = new Playlist({
        name:"ExpressJS",
        ctype:"Backend",
        videos:12,
        author:"kausik porey",
        active:true
    })
    const result = await Playlist.insertMany([mongoPlaylist,mongoosePlaylist,expressPlaylist]);
    console.log(result);
}catch(err){
    console.log(err);
 }
}

createdocument();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/database",{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => console.log('Connection Successful.'))
.catch((err) => console.log(err));

const playlistSchema = new mongoose.Schema({
    name:{type:String,required:true},
    ctype:String,
    videos:Number,
    author:String,
    active:Boolean,
    date:{type:Date,default:Date.now}
})

const Playlist = new mongoose.model("Playlist",playlistSchema);  //create a collection named playlists


const createdocument = async() =>{
try{    
    const jsPlaylist = new Playlist({
        name:"Javascript",
        ctype:"Front End",
        videos:80,
        author:"kausik porey",
        active:true
    })
    const mongoPlaylist = new Playlist({
        name:"Mongo Db",
        ctype:"Database",
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
    const result = await Playlist.insertMany([jsPlaylist,mongoPlaylist,mongoosePlaylist,expressPlaylist]);
    console.log(result);
}catch(err){
    console.log(err);
 }
}

createdocument();
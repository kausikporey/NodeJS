const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/database",{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => console.log('Connection Successful'))
.catch((err) => console.log(err));

const playlistSchema = new mongoose.Schema({
    name:{type:String,required:true},
    ctype:String,
    videos:Number,
    author:String,
    active:Boolean,
    date:{type:Date,default:Date.now}
});

const Playlist = mongoose.model("Playlist",playlistSchema);

const getDocument = async()  => {
    try{
    const result1 = await Playlist.find({videos: {$gt:50}});   //it checkes in which document videos is greater than 50
    //const result2 = await Playlist.find({videos: {$lte:80}});   //it checkes in which document videos is less than equal to 50
    //const result3 = await Playlist.find({ctype: {$in:["Db","Front End"]}});   //it checks in which document ctype is eother Db or Front End
    console.log([result1]);
    }catch(err){
        console.log(err);
    }
}

getDocument();
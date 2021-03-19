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
    const result = await Playlist.find({name:"Javascript"}).select({ctype:1});
    console.log(result);
    }catch(err){
        console.log(err);
    }
}

getDocument();
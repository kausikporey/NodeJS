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

const deleteDocument = async(id) => {
    try{
     //const result = await Playlist.deleteOne({_id : id});
     const result = await Playlist.findByIdAndDelete({_id:id});
     console.log(result);
    }catch(err){
        console.log(err);
    }
}

deleteDocument("5fe179e2b9fdc21228df2000");
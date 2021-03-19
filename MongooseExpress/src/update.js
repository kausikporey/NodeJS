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

const updateDocument = async(id) => {
    try{
    //const result = await Playlist.updateOne({_id : id},{$set: {name:"NodeJS"}});
    const result = await Playlist.findByIdAndUpdate({_id : id},{$set: {name:"NodeJS kausik"}},{new:true,useFindAndModify:false});
    console.log(result);
    }catch(err){
        console.log(err);
    }
}

updateDocument("5fe179e2b9fdc21228df2000");
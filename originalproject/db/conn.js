const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/registration",{useCreateIndex:true,useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true})
.then(() => console.log('Connection Successful'))
.catch((err) => console.log(err));


const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/students-api", {useUnifiedTopology: true,useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false})
.then(() =>  console.log('Connection Successful'))
.catch((err) => console.log("Connnection Unsuccessful due to",err));

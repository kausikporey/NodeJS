const fs = require('fs');

const bioData = {
    name:"kausik",
    age : 22,
    course : "B.Tech"
};

const jsondata = JSON.stringify(bioData);
fs.writeFile("JsonFormat/bio.json",jsondata,(err) => {
    console.log('Write Successfullly');
});
fs.readFile("JsonFormat/bio.json","utf-8",(err,data) => {
    console.log(data);
    const orgdata = JSON.parse(data);
    console.log(orgdata);
});
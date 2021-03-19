const fs = require('fs');
//const data = fs.readFileSync('fsAsync/read.txt','utf-8');
//console.log(data);
//console.log('I am kausik porey.');


const data = fs.readFile('fsAsync/read.txt','utf-8',(err,data) => {
    console.log(data)
});
console.log('I am kausik porey.');

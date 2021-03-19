const fs = require('fs');
fs.writeFile('fsAsync/read.txt',"Today is awsome day.\n",(err) => {
    console.log('File is created');
});//callback function : after completing the file creation and add data into it what to do actually.

fs.appendFile('fsAsync/read.txt','Tommorrow was also awesome.',(err) => {
    console.log('Inseted Successfully.');
});

fs.readFile('fsAsync/read.txt','utf-8',(err,data) => {
    console.log(data);
});
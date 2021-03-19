const fs = require('fs');
fs.mkdir('NodeCh/kausik',(err) => {
    console.log('Folder Created.');
});

fs.writeFile('NodeCh/kausik/bio.txt','Hi Welcome to Jio Network.\n',(err) => {
    console.log('File Created and Data Inserted.');
});

fs.appendFile('NodeCh/kausik/bio.txt',"You are in the India's most updated network.\n",(err) => {
    console.log('Data Inserted and Updated.');
});

fs.readFile('NodeCh/kausik/bio.txt','utf-8',(err,data) => {
    console.log(data);
});

fs.rename('NodeCh/kausik/bio.txt','NodeCh/kausik/Mybio.txt',(err) => {
    console.log("File Renamed");
})

fs.unlink('NodeCh/kausik/Mybio.txt',(err) => {
    console.log("File deleted");
})

fs.rmdir('NodeCh/kausik',(err) => {
    console.log("Folder deleted");
})
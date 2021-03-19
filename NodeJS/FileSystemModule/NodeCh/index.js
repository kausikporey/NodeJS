const fs = require('fs');
fs.mkdirSync('NodeCh/kausik');
fs.writeFileSync('NodeCh/kausik/bio.txt',"Welcome to my channel.\n");
fs.appendFileSync('NodeCh/kausik/bio.txt',"Hi I am kausik Porey.");
const data = fs.readFileSync('NodeCh/kausik/bio.txt','utf-8');
console.log(data);
fs.renameSync('NodeCh/kausik/bio.txt','NodeCh/kausik/Mybio.txt')
fs.unlinkSync('NodeCh/kausik/Mybio.txt');
fs.rmdirSync('NodeCh/kausik');
const path = require('path');

console.log(path.dirname("C:/Users/kousi/Desktop/NodeJS/PathModule/path.js"));
console.log(path.extname("C:/Users/kousi/Desktop/NodeJS/PathModule/path.js"));
console.log(path.basename("C:/Users/kousi/Desktop/NodeJS/PathModule/path.js"));

const mypath = path.parse("C:/Users/kousi/Desktop/NodeJS/PathModule/path.js");
console.log(mypath.name);
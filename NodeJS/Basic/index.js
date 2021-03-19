const fs = require('fs')
fs.writeFileSync('read.txt',"welcome to my channel\n")
fs.appendFileSync('read.txt'," hi , welcome to my channel")
const buf_data = fs.readFileSync('read.txt')
const original_data = buf_data.toString() //convert buffer data to original data
console.log(original_data)
fs.renameSync('read.txt','readwrite.txt') //to rename a file
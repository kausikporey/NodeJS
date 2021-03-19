const chalk = require('chalk');
//console.log(chalk.white.inverse("Success"));


const validator = require('validator');
const res = validator.isEmail('kousikporey199745877@gmail.com');
console.log(res ? chalk.green.inverse(res) : chalk.red.inverse(res));
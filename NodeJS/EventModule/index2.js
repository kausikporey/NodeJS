const EventEmitter  = require('events');
const event = new EventEmitter();

event.on("checkpage",(sc,msg) => {
    console.log(`Status Code is ${sc} and msg is ${msg}`);
})
event.emit("checkpage",200,'ok');
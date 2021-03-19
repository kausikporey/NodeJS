const EventEmitter = require('events');
const event = new EventEmitter();

event.on('sayMyname',() => {
    console.log('My name is kausik porey')
})
event.on('sayMyname',() => {
    console.log('My name is kp')
})
event.on('sayMyname',() => {
    console.log('My name is khapy')
})
event.on('addr',() => {
    console.log('My address is anandapur kamardanga khasbarh ghatal paschim medinipur')
})
event.emit('sayMyname');
event.emit('addr');
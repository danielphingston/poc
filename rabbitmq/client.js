const rabbit = require("amqplib");
const open = rabbit.connect("amqp://localhost");
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const emitter = new MyEmitter();

open.then((con) => {
    con.createChannel().then((ch) => {
        ch.consume("alerts", (msg) => {
            console.log(msg.content.toString());
            ch.close().then(() => {
                console.log("closed");
            });
        });
    });
});

emitter.on("message", (message) => {
    console.log("listener1", message);
});

emitter.on("message", (message) => {
    console.log("listener2", message);
});

emitter.on("message", (message) => {
    console.log("listener2", message);
});

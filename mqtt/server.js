const rabbit = require("amqplib/");
const open = rabbit.connect("amqp://localhost");

open.then((con) => {
    con.createChannel().then((ch) => {
        ch.publish("amq.topic","mqtt-test", Buffer.from("Hello World"));
    });
});

const rabbit = require("amqplib");
const express = require("express");

const open = rabbit.connect("amqp://localhost");
const exchange = "test2";
/**
 * @type {rabbit.Channel}
 */
let ch = null;

const app = express();

open.then((conn) => {
    return conn.createChannel();
}).then((channel) => {
    console.log("channel opened");
    ch = channel;
});

function addtoQueue(message) {
    if (!ch) {
        throw new Error("channel not established!");
    }
    ch.assertExchange(exchange, "topic", {
        durable: true,
    });
    ch.publish(exchange, "", Buffer.from(message), { expiration: 60 * 1000 });
}

function consumeMessages(exchange, callback) {
    open.then((conn) => {
        return conn.createChannel();
    })
        .then((channel) => {
            channel
                .assertExchange(exchange, "topic", { durable: true })
                .then(() => {
                    channel.assertQueue("test", { durable: true }).then((q) => {
                        channel.bindQueue(q.queue, exchange, "test");
                        channel.consume(
                            q.queue,
                            (message) => {
                                callback?.(message.content.toString());
                            },
                            { noAck: true }
                        );
                    });
                });
        })
        .catch((e) => {
            console.log(e);
        });
}

const messages = [];

consumeMessages(exchange, (message) => {
    messages.push(message);
});

consumeMessages(exchange, (message) => {
    console.log(message);
});


app.use(express.json());

app.use("/add", (req, res, next) => {
    console.log(req.body);
    if (!req.body.message) {
        res.json({
            error: "missing parameters",
        });
        return;
    }
    addtoQueue(req.body.message);
    res.json({
        status: "success",
    });
});

app.use("/test", (req, res, next) => {
    console.log("here");
    consumeMessages(exchange, (message) => {
        console.log(message);
        res.json({ message });
    });
});

app.use("/", (req, res, next) => {
    res.json(messages);
});

app.listen(3000);

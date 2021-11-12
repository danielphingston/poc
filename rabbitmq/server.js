const rabbit = require("amqplib");
const open = rabbit.connect("amqp://localhost");

const testJson = {
    useCase: "Face",
    cameraId: "static",
    streamId: "d7d1cbb38c7b0c1f8ab1cbbd85bb9512",
    timeStamp0: 1633517428625,
    timeStamp: 1633517428625,
    image: "_d7d1cbb38c7b0c1f8ab1cbbd85bb9512_frame_0.jpg",
    detectedLabels: ["test1"],
};

open.then((con) => {
    con.createChannel().then((ch) => {
        ch.publish("", "smsAlertQueue", Buffer.from(JSON.stringify(testJson)));
    });
});

const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:2000/ws/connect");

ws.on("open", () => {
    console.log("opened");
});

ws.on("error", (err) => {
    console.log(err);
});

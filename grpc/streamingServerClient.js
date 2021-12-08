const grpc = require("@grpc/grpc-js");

const { loadSync } = require("@grpc/proto-loader");
const path = require("path");

const StreamService = grpc.loadPackageDefinition(
    loadSync(path.join(__dirname, "./proto/streamServer.proto"), {
        keepCase: true,
    })
).StreamService;
const host = "localhost";
const port = "50051";

const client = new StreamService(
    `${host}:${port}`,
    grpc.credentials.createInsecure()
);

client.ConvertToRTSP(
    {
        id: 4,
        url: "https://www.youtube.com/watch?v=21X5lGlDOfg",
        type: "youtube",
        sessionId: 2,
    },
    (err, resp) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log(resp);
    }
);

module.exports = client;

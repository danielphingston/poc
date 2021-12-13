const grpc = require("@grpc/grpc-js");
const { loadSync } = require("@grpc/proto-loader");
const packageDefinition = loadSync("./proto/ds.proto", { keepCase: true });
const deepStreamClient = require("./deepstreamClient");

const deepStreamProto = grpc.loadPackageDefinition(packageDefinition).dsProto;

const host = "127.0.0.1";
const port = "50050";
const server = new grpc.Server();

server.addService(deepStreamProto.DeepStreamEventService.service, {
    TriggerDSEventDataNotify: (call, callback) => {
        console.log(call.request);
        callback(null, {});
        setTimeout(() => {
            deepStreamClient.TriggerDSEventProcessedDataNotify(
                {
                    labels: ["labels", 1],
                    uniqueID: call.request.uniqueID,
                },
                (err, response) => {
                    console.log(err);
                    console.log(response);
                }
            );
        }, 5000);
    },
    TriggerDSEventUpload: (call, callback) => {
        console.log(call.request);
        callback(null, {
            outUrl: call.request.inUrl,
            wsUrl: "http://localhost:3000",
        });
    },
});

server.bindAsync(
    `${host}:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) {
            console.log(err);
            return;
        }
        server.start();
        console.log(`Server running at ${host}:${port}`);
    }
);

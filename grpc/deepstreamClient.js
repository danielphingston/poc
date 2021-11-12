const grpc = require("@grpc/grpc-js");

const { loadSync } = require("@grpc/proto-loader");
const path = require("path");

const deepStreamProto = grpc.loadPackageDefinition(
    loadSync(path.join(__dirname, "./proto/ds.proto"), { keepCase: true })
).dsProto;

// @ts-ignore
const deepStreamClient = new deepStreamProto.DeepStreamEventService(
    "0.0.0.0:50000",
    grpc.credentials.createInsecure()
);
module.exports = deepStreamClient;

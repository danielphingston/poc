const grpc = require("@grpc/grpc-js");
const { loadSync } = require("@grpc/proto-loader");
const packageDefinition = loadSync("./proto/doc_parser_msg.proto", { keepCase: true });
const deepStreamClient = require("./deepstreamClient");

const DocParseProto = grpc.loadPackageDefinition(packageDefinition);

const host = "0.0.0.0";
const port = "50051";
const server = new grpc.Server();

server.addService(DocParseProto.DocParseService.service, {
    Parse: (call, callback) => {
        console.log(call.request);
        callback(null, {
            status: "OK",
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

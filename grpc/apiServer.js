const grpc = require("@grpc/grpc-js");

const { loadSync } = require("@grpc/proto-loader");
const path = require("path");

const apiServerProto = grpc.loadPackageDefinition(
    loadSync(path.join(__dirname, "./proto/APIService.proto"), {
        keepCase: true,
    })
);

// @ts-ignore
const apiServerClient = new apiServerProto.APIService(
    "0.0.0.0:50000",
    grpc.credentials.createInsecure()
);

// apiServerClient.TriggerDSEventProcessedDataNotify(
//     {
//         labels: ["labels", 1],
//         uniqueID: "call.request.uniqueID",
//     },
//     (err, response) => {
//         console.log(err);
//         console.log(response);
//     }
// );

apiServerClient.RemoveStream(
    {
        streamId: "1",
        cameraId: "2",
    },
    (err, response) => {
        console.log(response);
    }
);

module.exports = apiServerClient;

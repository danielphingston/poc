const grpc = require("@grpc/grpc-js");
const { loadSync } = require("@grpc/proto-loader");
const packageDefinition = loadSync("./proto/notes.proto");

const notesProto = grpc.loadPackageDefinition(packageDefinition);

const host = "127.0.0.1";
const port = "50051";
const server = new grpc.Server();

const notes = [
    {
        id: 1,
        title: "Note 1",
        content: "Content 1",
    },
    { id: 2, title: "Note 2", content: "Content 2" },
];

server.addService(notesProto.NoteService.service, {
    list: (_, callback) => {
        callback(null, { notes: notes });
    },
    addNote: (call, callback) => {
        notes.push(call.request);
        callback(null, { status: true, message: "Success" });
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

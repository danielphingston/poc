const grpc = require("@grpc/grpc-js");
const { loadSync } = require("@grpc/proto-loader");
const packageDefinition = loadSync("./proto/notes.proto");

const NoteService = grpc.loadPackageDefinition(packageDefinition).NoteService;
const host = "localhost";
const port = "50051";

const client = new NoteService(
    `${host}:${port}`,
    grpc.credentials.createInsecure()
);

client.addNote({ id: 3, title: "title" }, (err, resp) => {
    console.log(resp);
    client.list({}, (error, resp) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(resp.notes);
    });
});




module.exports = client;

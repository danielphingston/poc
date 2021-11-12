const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const { protect } = require("./src/protect");
const logger = require("morgan");
const memoryStore = new session.MemoryStore();
const { getKeycloak, getUserName } = require("./src/keycloak");

const keycloak = getKeycloak(memoryStore);

app.use(
    session({
        secret: "keycloak-backend-secret",
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
    })
);

app.use(cors());

app.use(express.json());

app.use(logger("dev"));

app.use(keycloak.middleware());

app.use("/user/:useCase", protect(["user"], true), (req, res) => {
    res.send(`hello ${req.params.useCase} user`);
});

app.use("/admin/:useCase", protect("admin", true), (req, res) => {
    res.send(`hello ${req.params.useCase} admin`);
});

app.use("/admin/", protect("admin"), (req, res) => {
    res.send("hello admin");
});

app.use("/user/", protect("user"), (req, res) => {
    console.log(getUserName(req));

    res.send("hello user");
});

app.use("/all", protect("user"), (req, res) => {
    res.send("hello all");
});

app.use("/", (req, res) => {
    res.send("hello");
});

app.listen(3000, () => {
    console.log("server started");
});

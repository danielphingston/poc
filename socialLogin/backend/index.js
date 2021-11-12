require("dotenv").config();
const express = require("express");
const app = express();

const passport = require("passport");
const cors = require("cors");
app.use(cors());

require("./auth")();

app.use(
    require("express-session")({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/login", passport.authenticate("twitter"));

app.use(
    "/callback",
    passport.authenticate("twitter", {
        failureRedirect: "/login",
    }),
    (req, res, next) => {
        res.json({
            user: req.user,
        });
    }
);

app.listen(4000, () => {
    console.log("server started at port 4000");
});

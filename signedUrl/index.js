const jwt = require("jsonwebtoken");

const test = jwt.sign({ url: "www.google.com" }, "secret", {
    expiresIn: "1s",
});

setTimeout(() => {
    const t = jwt.verify(test, "secret");
    console.log(t);
}, 2000);

console.log(test);

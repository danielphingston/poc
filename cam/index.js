const onvif = require("node-onvif");
const { writeFileSync } = require("fs");

console.log("Start the discovery process.");

const baseUrl = "http://10.1.20.183:8080/";
let device = new onvif.OnvifDevice({
    xaddr: baseUrl + "onvif/device_service",
    user: "admin",
    pass: "admin",
});

device
    .init()
    .then((info) => {
        // Show the detailed information of the device.
        console.log(JSON.stringify(info, null, " done"));
        device
            .fetchSnapshot()
            .then((res) => {
                writeFileSync("snapshot.jpg", res.body, { encoding: "binary" });
                console.log("Done!");
            })
            .catch((err) => {
                console.log(err);
            });
        device
            .ptzMove({ speed: { x: 1, y: 1, z: 0 }, timeout: 2 })
            .then(() => {
                console.log("done");
                setTimeout(() => {
                    device.fetchSnapshot().then((res) => {
                        writeFileSync("snapshot-after.jpg", res.body, {
                            encoding: "binary",
                        });
                        console.log("Done!");
                    });
                }, 2000);
            })
            .catch((e) => {
                console.log(e);
            });
    })
    .catch((error) => {
        console.error(error);
    });

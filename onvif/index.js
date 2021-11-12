const onvif = require("node-onvif");
const { writeFileSync } = require("fs");

console.log("Start the discovery process.");
// Find the ONVIF network cameras.
// It will take about 3 seconds.
const workingUrls = [{ url: "http://202.175.114.212/", user: "", pass: "" }];

const baseUrl = "http://148.68.226.32:8080/";
let device = new onvif.OnvifDevice({
    xaddr: baseUrl + "onvif/device_service",
    user: "root",
    pass: "camera",
});

device
    .init()
    .then((info) => {
        // Show the detailed information of the device.
        console.log(JSON.stringify(info, null, " done"));
        device.fetchSnapshot().then((res) => {
            writeFileSync("snapshot.jpg", res.body, { encoding: "binary" });
            console.log("Done!");
        });
        device.ptzMove({ speed: { x: 1, y: 1, z: 1 }, timeout: 2 }).then(() => {
            console.log("done");
            setTimeout(() => {
                device.fetchSnapshot().then((res) => {
                    writeFileSync("snapshot-after.jpg", res.body, {
                        encoding: "binary",
                    });
                    console.log("Done!");
                });
            }, 2000);
        });
    })
    .catch((error) => {
        console.error(error);
    });

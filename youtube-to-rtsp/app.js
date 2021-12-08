const RtspServer = require("rtsp-streaming-server").default;
const youtubedl = require("youtube-dl-exec");
const ffmpeg = require("easy-ffmpeg");
const pathToFfmpeg = require("ffmpeg-static");
ffmpeg.setFfmpegPath(pathToFfmpeg);

const server = new RtspServer({
    serverPort: 5554,
    clientPort: 6554,
    rtpPortStart: 10000,
    rtpPortCount: 10000,
    publishServerHooks: {
        checkMount: (req) => {
            console.log(req.uri);
            return true;
        },
    },
    clientServerHooks: {
        checkMount: (req) => {
            console.log(req);
            return true;
        },
    },
});

async function run() {
    try {
        await server.start();
        // server.ClientServer.mounts.addMount("/stream1");
    } catch (error) {
        console.log(error);
    }
    convertYoutubeToRTSP("https://wzmedia.dot.ca.gov/D3/80_taylor.stream/playlist.m3u8");
    // youtubedl("https://www.youtube.com/watch?v=21X5lGlDOfg", {
    //     dumpSingleJson: true,
    //     noWarnings: true,
    //     noCallHome: true,
    //     noCheckCertificate: true,
    //     preferFreeFormats: true,
    //     youtubeSkipDashManifest: true,
    // })
    //     .then((output) => {
    //         const preferredFormat = getPreferredFormat(output);
    //         convertYoutubeToRTSP("https://wzmedia.dot.ca.gov/D3/80_taylor.stream/playlist.m3u8");
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         throw new Error(
    //             "Failed to get youtube link.please check the entered url"
    //         );
    //     });
}

run();

function getPreferredFormat(output) {
    try {
        const preferredFormat = output.formats
            .filter((x) => x.height <= 1080 && x.manifest_url)
            .reduce((a, b) => (a.height > b.height ? a : b));
        return preferredFormat;
    } catch (error) {
        throw new Error("Unable to get preferred format");
    }
}

function convertYoutubeToRTSP(url) {
    console.log(url);
    const stream = ffmpeg()
        .input(url)
        .outputFormat("rtsp")
        .output("rtsp://localhost:5554/stream1");

    stream.on("error", (err) => {
        console.log(err);
    });

    stream.on("start", () => {
        console.log("Trying to connect to ");
    });

    stream.on("end", (stdout, stderr) => {
        console.log("Stream exited");
    });

    stream.on("codecData", (data) => {
        console.log("RTSP Connected ");
    });

    stream.run();
}

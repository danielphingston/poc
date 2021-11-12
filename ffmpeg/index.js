const ffmpeg = require("easy-ffmpeg");
const pathToFfmpeg = require("ffmpeg-static");
const ffprobe = require("ffprobe-static");
const path = require("path");

ffmpeg.setFfmpegPath(pathToFfmpeg);
ffmpeg.setFfprobePath(ffprobe.path);

const name = "test";

const ff = ffmpeg()
    .input("rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov")
    .inputOption("-rtsp_transport tcp")
    .output(path.join("output", `${name}.mpd`))
    .format("dash")
    .videoCodec("libx264")
    .noAudio()
    .outputOptions([
        "-min_seg_duration 3e+6",
        "-preset veryfast",
        "-movflags +faststart+negative_cts_offsets",
    ]);

// ff.output(path.join("output", `${name}.mp4`)).outputOptions([
//     "-preset veryfast",
//     "-movflags +faststart+dash+negative_cts_offsets",
//     "-keyint_min 60",
// ]);

console.log(ff._getArguments());

ff.on("error", (err) => {
    console.log("An error occurred");
    console.log(err);
});

ff.run();

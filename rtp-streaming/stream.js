const ffmpeg = require("easy-ffmpeg");
let videoCodec = "libx264";
const pathToFfmpeg = require("ffmpeg-static");
ffmpeg.setFfmpegPath(pathToFfmpeg);

ffmpeg().input("")
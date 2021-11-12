const NodeMediaServer = require("node-media-server");
const pathToFfmpeg = require("ffmpeg-static");
const config = {
    logType: 3,
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60,
    },
    http: {
        port: 8000,
        mediaroot: "./media",
        allow_origin: "*",
    },
    // relay: {
    //     ffmpeg: pathToFfmpeg,
    //     tasks: [
    //         {
    //             app: "live",
    //             mode: "static",
    //             edge: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
    //             name: "s",
    //             rtsp_transport: "tcp",
    //         },
    //     ],
    // },
    trans: {
        ffmpeg: pathToFfmpeg,
        tasks: [
            {
                app: "live",
                dash: true,
                dashFlags:
                    "[f=dash:window_size=5:extra_window_size=15:min_seg_duration=3e+6]",
            },
            {
                app: "live",
                mp4: true,
                mp4Flags: "[movflags=frag_keyframe+empty_moov]",
            },
        ],
    },
    // auth: {
    //     play: true,
    //     secret: "nodemedia2017privatekey",
    // },
};

const tasks = [
    {
        app: "test",
        mode: "static",
        edge: "rtsp://127.0.0.1:6554/s",
        name: "s",
        rtsp_transport: ["tcp"],
    },
];

var nms = new NodeMediaServer(config);

nms.run();

// nms.config.relay.tasks = tasks;

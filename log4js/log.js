const log4js = require("log4js");

const SERVICE = "EDGE-API";

const LOG_LEVEL = process.env.DEBUG;

log4js.configure({
    appenders: {
        out: {
            type: "stdout",
            layout: {
                type: "pattern",
                pattern: "%[%d %x{service} %p %f{2}:%l %x{error} %n%]",
                tokens: {
                    error: (e) => {
                        return e.data.map((x) =>
                            x instanceof Error ? x.message : JSON.stringify(x)
                        );
                    },
                    service: (e) => {
                        console.log(e.context.service);
                        return e.context.service;
                    },
                },
            },
        },
        error: {
            type: "file",
            filename: "logs/error.log",
            pattern: "yyyy-MM-dd",
            keepFileExt: true,
            alwaysIncludePattern: true,
            layout: {
                type: "pattern",
                pattern: "%[%d %x{service} %p %f{2}:%l %m%n]%",
                tokens: {
                    service: (e) => {
                        console.log(e.context.service);
                        return e.context.service;
                    },
                },
            },
        },
        debug: {
            type: "file",
            filename: "logs/debug.log",
            pattern: "yyyy-MM-dd",
            keepFileExt: true,
            alwaysIncludePattern: true,
            layout: {
                type: "pattern",
                pattern: "%d %x{service} %p %f{2}:%l %m%n",
                tokens: {
                    service: (e) => {
                        console.log(e.context.service);
                        return e.context.service;
                    },
                },
            },
        },
        "info-filter": {
            level: "info",
            appender: "out",
            type: "logLevelFilter",
        },
    },
    categories: {
        default: {
            appenders: ["info-filter", "debug"],
            level: "debug",
            enableCallStack: true,
        },
        debug: {
            appenders: ["out", "debug"],
            level: "debug",
            enableCallStack: true,
        },
    },
});

module.exports = (service) => {
    if (LOG_LEVEL == "debug") {
        const logger = log4js.getLogger("debug");
    } else {
        const logger = log4js.getLogger();
    }
    logger.addContext("service", service);
    return logger;
};
const logger = log4js.getLogger();
logger.addContext("service", "service");

const logger2 = log4js.getLogger();
logger2.info("helo")
logger.info("s")
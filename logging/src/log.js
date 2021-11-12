const winston = require("winston");
const util = require("util");

const path = require("path");

function printJson(value) {
    if (typeof value === "object") {
        return JSON.stringify(value);
    }
    return value;
}

const logFormat = winston.format.printf(
    (info) =>
        `${info.timestamp} ${info.level} [${info.label}]: ${printJson(
            info.message
        )}`
);

function getLogger(file) {
    const format = winston.format.combine(
        winston.format.label({ label: file }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.metadata({
            fillExcept: ["message", "level", "timestamp", "label"],
        }),
        winston.format.splat(),
        logFormat
    );

    const transports = {
        error: new winston.transports.File({
            filename: "logs/error.log",
            format: winston.format.json(),
            level: "error",
        }),
        debug: new winston.transports.File({
            filename: "logs/debug.log",
            level: "debug",
        }),
        info: new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), format),
        }),
    };

    const logger = winston.createLogger({
        level: "info",
        format: format,
        defaultMeta: { service: "test-service" },
        transports: [transports.debug, transports.error, transports.info],
    });

    logger.error = wrapper(logger.error);
    logger.info = wrapper(logger.info);
    logger.debug = wrapper(logger.debug);

    return logger;
}

const wrapper = (original) => {
    // temp fix for winston not allowing to pass multiple parameters to log
    return (...args) => {
        return original(util.format(...args));
    };
};

module.exports = (module) =>
    getLogger(path.relative(process.cwd(), module.filename));

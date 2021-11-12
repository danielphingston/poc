const logger = require("./log")(module);

logger.info("test",22,{22:1});
logger.debug([1, 2, 3, { Das: 2 }],2);
try {
    x.ss;
} catch (error) {
    logger.error(error);
    logger.info("sd")
}

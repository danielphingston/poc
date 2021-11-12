const couchbase = require("couchbase");
const logger = console
const { documentTypes } = require("./documentTypes");

/**
 * @type Cluster
 */
let cluster;

/**
 * @type Bucket
 */
let bucket;

/**
 * @type Collection
 */
let collection;

const connect = async () => {
    if (!cluster) {
        cluster = await couchbase.connect(
            `couchbase://${process.env.CB_HOST}`,
            {
                username: process.env.CB_USER,
                password: process.env.CB_PASSWORD,
            }
        );
        bucket = cluster.bucket(process.env.CB_BUCKET);
        collection = bucket.defaultCollection();
        try {
            // check if connection is actually established
            await initialize();
        } catch (error) {
            logger.debug(error);
            throw error;
        }
    }
    return cluster;
};

async function initialize() {
    //create base documents if not exist
    await Promise.all(
        Object.values(documentTypes).map(async (type) => {
            try {
                await collection.get(type);
            } catch (error) {
                // @ts-ignore
                if (error instanceof couchbase.DocumentNotFoundError) {
                    logger.info(`Creating New Base Document : ${type}`);
                    await collection.insert(type, {});
                } else {
                    logger.error(error);
                }
            }
        })
    );
}

module.exports = {
    getCluster: () => cluster,
    getCollection: () => collection,
    connect,
};

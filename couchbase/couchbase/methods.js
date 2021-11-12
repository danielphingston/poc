const db = require("./main");
const couchbase = require("couchbase");
const logger = console

async function appendToArray(type, key, items) {
    if (db.getCollection() == null) {
        throw new Error("Collection has not been initialized!");
    }
    try {
        await db.getCollection().mutateIn(type, [
            // @ts-ignore
            couchbase.MutateInSpec.arrayAppend(key, items, {
                createPath: true,
                multi: true,
            }),
        ]);
    } catch (error) {
        console.log(error);
    }
}

/**
 *
 * @param {String} type
 * @param {String[]=} documentIds
 * @returns
 */
async function find(type, documentIds) {
    if (!documentIds) {
        const document = await db.getCollection().get(type);
        return document.content;
    }
    const documents = await db.getCollection().lookupIn(
        type,
        // @ts-ignore
        documentIds.map((x) => couchbase.LookupInSpec.get(x))
    );

    return documents.content;
}

async function addDocument(type, key, document) {
    if (db.getCollection() == null) {
        throw new Error("Collection has not been initialized!");
    }
    try {
        await db.getCollection().mutateIn(type, [
            // @ts-ignore
            couchbase.MutateInSpec.upsert(key, document),
        ]);
    } catch (error) {
        logger.debug(error);
        logger.error(error.message);
    }
}

/**
 *
 * @param {String} type
 * @param {String} key
 * @param {number} [batchSize=30]
 * @returns
 */

function getBatchWriter(type, key, batchSize = 30) {
    let batch = [];

    const write = () => {
        if (batch.length > 0) {
            appendToArray(type, key, batch);
            batch = [];
        }
    };

    const addToBatch = (data) => {
        batch.push(data);
        if (batch.length == batchSize) {
            write();
        }
    };
    return { addToBatch, write };
}

module.exports = { addDocument, find, appendToArray, getBatchWriter };

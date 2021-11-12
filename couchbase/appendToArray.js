require("dotenv").config();
const { connect, getCluster, getCollection, find } = require("./couchbase");

connect().then(async (db) => {
    const data = await find("StreamMetadata");
    console.log(data);
});

async function executeQuery(query, options) {
    // const query = `update default use keys "tt2" set afield = array_append(ifmissing(afield, []), 8)`;
    // const options = { parameters: ["airport", "San Jose"] };

    try {
        let result = await getCluster().query(query);
        console.log("Result:", result);
        return result;
    } catch (error) {
        console.error("Query failed: ", error);
    }
}

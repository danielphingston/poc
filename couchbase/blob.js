require("dotenv").config();
const { connect, getCluster, getCollection, find } = require("./couchbase");

connect().then(async (db) => {

});
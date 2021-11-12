function getUserName(req) {
    const name = req?.kauth?.grant?.access_token?.content?.preferred_username;
    if (!name) {
        throw new Error("Invalid Username");
    }
    return name;
}

function getSub(req) {
    const name = req?.kauth?.grant?.access_token?.content?.sub;
    if (!name) {
        throw new Error("Invalid Username");
    }
    return name;
}

module.exports = {
    getUserName,
    getSub
};

const Keycloak = require("keycloak-connect");
const { keycloakConfig } = require("./config");

/**
 * @type {Keycloak.Keycloak}
 */
let keycloak;

function getKeycloak(store) {
    if (keycloak) {
        return keycloak;
    } else {
        keycloak = new Keycloak(
            {
                store: store,
            },
            keycloakConfig
        );
        
        keycloak.accessDenied = (req, res) => {
            if (!req.headers.authorization) {
                res.status(401).json({
                    error: "unauthorized",
                });
            } else {
                res.status(403).json({
                    error: "unauthenticated",
                });
            }
        };

        return keycloak;
    }
}


module.exports = {
    getKeycloak,
};

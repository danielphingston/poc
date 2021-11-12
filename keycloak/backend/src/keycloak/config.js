const keycloakConfig = {
    realm: "edge-ai",
    "bearer-only": true,
    "auth-server-url": "http://localhost:8080/auth/",
    "ssl-required": "none",
    resource: "node-backend",
    "confidential-port": 0,
    // realmPublicKey:"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA19Ii9YRaqz2Y41dQhks7ivvX166WcsnaPvy24CcR08Sv+6bao8YqKyQRx6IRyzK+EdJneRAaX5fT6Zabf2ct546HMckocLj7DUellI4qKlT8c9A+atq2grBoQ8OFVIqaz9JrGzM5qmBJuYurpCVctYgzp90EB6/tXJm8Xs7Ia0KFLaRoDgvZR2X9c5Q/JEZ1GJBndn9SHVSY0GHLVddGsm4v840IbV+heKiCjdjcSboUgrkjtQ71s0T/Q1RAjHvPAY6VNnIyi4P7JGM6Vr+BdQPtv4YnIplHUQNRZ8MkZ3JitlMmzi6EuFBiHpXTFOZmNiGKRZINw8ocY1mORi0rbQIDAQAB"
};

module.exports = {  keycloakConfig };

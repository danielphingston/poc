const keycloak = require("./keycloak").getKeycloak();

/**
 *
 * @param {string|string[]} role
 * @param {boolean} checkUseCase
 */
function protect(role = null, checkUseCase = false) {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     *
     */
    return keycloak.protect((token, req, res) => {
        if (!checkUseCase) {
            return authenticate(token, role);
        } else {
            const useCase = req.body?.useCase;
            console.log(useCase);
            if (!useCase) {
                return false;
            } else {
                return (
                    authenticate(token, role) &&
                    authenticateUseCase(token, useCase, role)
                );
            }
        }
    });
}

/**
 *
 * @param {import("keycloak-connect").Token} token
 * @param {*} role
 * @returns
 */
function authenticate(token, role) {
    if (!role) {
        return true;
    } else if (Array.isArray(role)) {
        return role.some((x) => token.hasRole(x));
    } else {
        console.log(token.hasRole(role));
        return token.hasRole(role);
    }
}

/**
 *
 * @param {import("keycloak-connect").Token} token
 * @param {string} useCase
 */
function authenticateUseCase(token, useCase, role) {
    if (Array.isArray(role)) {
        return role.some((r) => token.hasRole(`${useCase}-${r}`));
    }
    return token.hasRole(`${useCase}-${role}`);
}

module.exports = { protect };

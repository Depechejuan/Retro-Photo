"use strict";

const jwt = require("jsonwebtoken");
const { invalidCredentials } = require("../../services/error-services");
const { generateJWT } = require("../../services/crypto-services");

module.exports = {
    async login(data) {
        // const user = get user by email

        if (!user) {
            throw invalidCredentials();
        }

        // const passMatch = validate password

        // if !pass, invalidcredentials
        const userData = {
            id: user.id,
            email: user.email,
        };

        const token = generateJWT({
            id: user.id,
            email: user.email,
            name: user.name,
        });

        return {
            token,
            userData,
        };
    },
};

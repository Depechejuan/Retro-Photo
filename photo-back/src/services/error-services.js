"use strict";

const { sendError } = require("../utils/send-error");
const { sendResponse } = require("../utils/send-response");

let err;

module.exports = {
    invalidCredentials() {
        err = new Error("You must enter a valid email and password");
        err.status = 400;
        err.code = "INVALID_CREDENTIALS";
        throw err;
    },

    emailAlreadyRegistered() {
        const err = new Error("This email has already been registered");
        err.status = 400;
        err.code = "EMAIL_ALREADY_REGISTERED";
        throw err;
    },

    didNotAcceptedTOS() {
        err = new Error("User must accept terms and services to register");
        err.status = 403;
        err.code = "DID_NOT_ACCEPT_TOS";
        throw err;
    },

    notAuth() {
        err = new Error("User not authenticated. Token missing");
        err.status = 401;
        err.code = "NOT_AUTHENTICATED";
        throw err;
    },

    unauthorized() {
        err = new Error("User not authorized to do this action");
        err.status = 403;
        err.code = "UNAUTHORIZED";
        throw err;
    },

    notFound() {
        err = new Error("Not Found");
        err.status = 404;
        err.code = "NOT_FOUND";
        throw err;
    },
};

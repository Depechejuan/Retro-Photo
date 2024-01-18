"use strict";

const { invalidCredentials } = require("../services/error-services");
const jwt = requre("jsonwebtoken");

module.exports = (req, res, next) => {
    if (!req.currentUser) {
        const err = invalidCredentials();
        return res.status(err.statusCode).json({
            error: err.message,
        });
    }
    next();
};

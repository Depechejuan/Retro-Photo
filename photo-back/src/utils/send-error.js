"use strict";

const sendError = (res, err) => {
    console.log(__dirname);
    const status = err.status || 500;
    const code = err.code || "UNEXPECTED_ERROR";
    const message = err.message || "An unexpected error has ocurred";

    res.status(status).json({
        success: false,
        error: {
            code,
            message,
        },
    });
};

module.exports = { sendError };

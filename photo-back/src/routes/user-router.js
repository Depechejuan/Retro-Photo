"use strict";

const { Router, json } = require("express");
const multer = require("multer");
const upload = multer();
const { register } = require("../controllers/users/register");
const { sendResponse } = require("../utils/send-response");
const { emailAlreadyRegistered } = require("../services/error-services");
const { sendError } = require("../utils/send-error");
const { login } = require("../controllers/users/login");

const router = Router();

router.post("/register", json(), async (req, res) => {
    try {
        const result = await register(req.body);
        sendResponse(res, result);
    } catch (err) {
        sendError(res, err);
    }
});

router.post("/login", json(), async (req, res) => {
    console.log("login");
    try {
        const token = await login(req.body);
        console.log(token);
        sendResponse(res, { token });
    } catch (err) {
        sendResponse(res, err);
    }
});

module.exports = router;

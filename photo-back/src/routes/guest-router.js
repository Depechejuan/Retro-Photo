"use strict";

const { Router, json } = require("express");
const multer = require("multer");
const upload = multer();
const { register } = require("../controllers/users/register");
const { sendResponse } = require("../utils/send-response");
const { emailAlreadyRegistered } = require("../services/error-services");
const { sendError } = require("../utils/send-error");

const router = Router();

router.post("/wedding/:id", json(), async (req, res) => {
    //
});

router.post("/upload", json(), upload.array("photo", 1), async (req, res) => {
    try {
        console.log("hola");
        const photo = req.file;
        console.log(photo);
        const sendPhoto = null; // send photo to Drive
        sendResponse(res, sendPhoto);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;

"use strict";

const { Router, json } = require("express");
const QRCode = require("qrcode");
const multer = require("multer");
const upload = multer();
const path = require("path");
const { register } = require("../controllers/users/register");
const { sendResponse } = require("../utils/send-response");
const { emailAlreadyRegistered } = require("../services/error-services");
const { sendError } = require("../utils/send-error");

const router = Router();

router.post("/wedding/:id", json(), async (req, res) => {
    console.log("Bienvenido a la boda!");
});

router.post("/upload", json(), upload.array("photo", 1), async (req, res) => {
    try {
        console.log("hola");
        const data = req.body;
        const wedding = data.WEDDING;
        const user = data.USER_WEDDING;
        const photo = req.file;
        console.log(photo);
        const sendPhoto = await sendPhoto(wedding, user, photo);
        sendResponse(res, sendPhoto);
    } catch (err) {
        console.error(err);
        sendError(res, err);
    }
});

module.exports = router;

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
const { generateUUID } = require("../services/crypto-services");

const HOST = process.env.HOST || "localhost";

const router = Router();

router.post("/wedding/:id", json(), async (req, res) => {
    console.log("Bienvenido a la boda!");
});

router.get("/wedding/create", async (req, res) => {
    const uuid = generateUUID();
    const URL = `${HOST}/wedding/${uuid}`;
    const qrCode = await QRCode.toDataURL(URL);
    const qrImagePath = path.join(__dirname, `../public/qrcodes/${uuid}.png`);
    const QR = await QRCode.toFile(qrImagePath, URL);
    sendResponse(res, QR);
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

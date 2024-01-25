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
const authGuard = require("../middlewares/auth-guard");
const softAuth = require("../middlewares/soft-auth");

const router = Router();

router.get("/wedding/:id", authGuard, json(), async (req, res) => {
    console.log("Bienvenido a la boda!");

    sendResponse(res);
});

router.post(
    "/wedding/:id/upload",
    softAuth,
    json(),
    upload.array("photo", 1),
    async (req, res) => {
        try {
            console.log("hola");
            const data = req.body;
            console.log(data);
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
    }
);

module.exports = router;

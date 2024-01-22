"use strict";

const { Router, json } = require("express");
const { register } = require("../controllers/users/register");
const { sendResponse } = require("../utils/send-response");
const {
    emailAlreadyRegistered,
    partnerNotRegistered,
} = require("../services/error-services");
const { sendError } = require("../utils/send-error");
const { login } = require("../controllers/users/login");
const authGuard = require("../middlewares/auth-guard");
const { generateQR } = require("../services/generate-qr");
const { getUserByEmail } = require("../services/db-services");
const { generateUUID } = require("../services/crypto-services");
const { sendInvite } = require("../services/mailer");

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

router.get("/test", async (req, res) => {
    console.log(req.currentuser);
    sendResponse(res, req.currentuser);
});

router.get("/wedding/create", authGuard, async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const currentUser = req.currentuser.email;
    console.log(currentUser);
    console.log(data.partner);
    const partnerMail = await getUserByEmail(data.partner);
    // TODO: ENVIAR MAIL CON INVITACIÓN A REGISTRO DEL PARNER
    if (!partnerMail) {
        const errorResponse = partnerNotRegistered();

        const sendMail = await sendInvite(data);
        console.log(sendMail);
        sendResponse(res, errorResponse, errorResponse.status);
        return;
    }

    const QR = await generateQR();
    const obj = {
        id: generateUUID(),
        weddingCode: QR,
        idUser1: currentUser,
        idUser2: partnerMail,
        weddingDate: data.date,
    };
    console.log("The Object");
    console.log(obj);
    //Guardarlo en la BBDD
    sendResponse(res, obj);
});
module.exports = router;

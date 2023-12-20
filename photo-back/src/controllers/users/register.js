/*
    LOGICA A TENER EN CUENTA.
    Un usuario te manda un QR con una URL para pertenecer a su lista
    Puede ser que no estés registrado, por lo que habría que hacer lo siguiente:
        - guardar la URL en el Local Storage
        - Redirigir al registro
        - Login
        - Ahí, hacer comprobacion
            Si hay localstorage "url_inv" > redirige a la boda
            else panel de control normal.
        Esto soluciona el que tras el registro, puedas acceder directamente a la boda.
*/

"use strict";

const {
    hashPassword,
    generateUUID,
} = require("../../services/crypto-services");
const { saveUser, getUserByEmail } = require("../../services/db-services");
const {
    didNotAcceptedTOS,
    emailAlreadyRegistered,
} = require("../../services/error-services");

module.exports = {
    async register(data) {
        if (!data.acceptedTOS) {
            didNotAcceptedTOS();
        }
        const alreadyReg = await getUserByEmail(data.email);
        if (alreadyReg) {
            emailAlreadyRegistered();
        }

        const hashedPass = await hashPassword(data.password);
        const id = generateUUID();

        const user = {
            ...data,
            id,
            password: hashedPass,
        };
        await saveUser(user);

        return {
            success: true,
            user,
        };
    },
};

const { generateUUID } = require("../../services/crypto-services");
const { authorize } = require("../../validators/google-auth");

async function sendPhotos(idWedding, idUser, photo) {
    try {
        const jwtClient = await authorize();
        const idPhoto = generateUUID();
        const path = `/${idWedding}/${idUser}/`;

        const savedPhoto = { idPhoto, path };
        return savedPhoto;
    } catch (err) {
        console.error(err);
    }
}

const { generateUUID } = require("../../services/crypto-services");
const { uploadFile } = require("../../services/upload-file");

module.exports = {
    async sendPhotos(idWedding, idUser, photo) {
        try {
            const idPhoto = generateUUID();
            const fileURL = `/${idUser}-${idPhoto}`;
            await uploadFile(fileURL, photo);
            console.log("Photo uploaded successfully");
            const savedPhoto = { idPhoto, fileURL };
            return savedPhoto;
        } catch (err) {
            console.error(err);
        }
    },
};

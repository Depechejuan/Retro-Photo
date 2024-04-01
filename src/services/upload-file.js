const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
require("dotenv").config();
const { Readable } = require("stream");
const { genericError } = require("./error-services");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// async deleted on the return new Promise(async ()....)
async function uploadFile(fileURL, photo) {
    try {
        photo.originalname = `${fileURL}.jpg`;

        const bufferStream = new Readable();
        bufferStream.push(photo.buffer);
        bufferStream.push(null);

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: `Wedding`,
                    public_id: fileURL,
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            bufferStream.pipe(uploadStream);
        });

        console.log(result);
        console.log(result.secure_url);
        console.log(result.url);

        return photo.originalname;
    } catch (err) {
        console.log(err);
        throw genericError();
    }
}

async function deleteFile(jwtClient, fileName) {
    try {
        const drive = google.drive({ version: "v3", auth: jwtClient });
        await drive.files.delete({
            fileId: fileName,
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = { uploadFile, deleteFile };

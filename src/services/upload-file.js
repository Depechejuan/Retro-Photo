const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const { genericError } = require("./error-service");
const { google } = require("googleapis");
const { Readable } = require("stream");

const urlDrive = process.env.GoogleDriveFolder;

// async deleted on the return new Promise(async ()....)
async function uploadFile(jwtClient, fileURL, photo) {
    console.log(photo);
    return new Promise((resolve, rejected) => {
        const drive = google.drive({ version: "v3", auth: jwtClient });
        let fileMetaData = {
            name: fileURL,
            parents: [`${urlDrive}`],
        };

        try {
            const response = drive.files.create({
                resource: fileMetaData,
                media: {
                    body: Readable.from([photo.buffer]),
                },
            });

            resolve(response);
        } catch (err) {
            rejected(err);
        }
    });
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

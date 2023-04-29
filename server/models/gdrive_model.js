const config = require("../config")
const fs = require('fs');
const { google } = require("googleapis")
const oAuth2Client = new google.auth.OAuth2(
    config.gDriveAPI.clientId,
    config.gDriveAPI.clientSecret,
    config.gDriveAPI.redirectURI
)

class Gdrive {

    static listFolder(folderId, token) {
        oAuth2Client.setCredentials(token);
        const drive = google.drive({ version: 'v3', auth: oAuth2Client });
        return drive.files.list({
            q: `mimeType='application/vnd.google-apps.folder' and '${folderId}' in parents`,
            fields: 'nextPageToken, files(id, name)',
            spaces: 'drive',
        }).then(response => response.data.files)
    }

    static async uploadFiles(task) {
        oAuth2Client.setCredentials(task.token);
        const drive = google.drive({ version: 'v3', auth: oAuth2Client });
        task.fileList.forEach(file => {
            const fileMetadata = {
                name: file.name,
                parents: [ task.targetFolder ]
            };
            const media = {
                mimeType: file.type,
                body: fs.createReadStream(`${task.currentPath}/${file.name}`),
            };
            drive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: "id",
                },
                (err, fileArg) => {
                    oAuth2Client.setCredentials(null);
                    if (err) {
                        console.error(err);
                    } else {
                        try {
                            fs.unlinkSync(`${task.currentPath}/${file.name}`)
                            console.log("success!")
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            );
        })
    }
}

module.exports = Gdrive
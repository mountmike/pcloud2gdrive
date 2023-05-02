const config = require("../config")
const fs = require('fs');
const db = require("../db/firebase");
const FieldValue = require('firebase-admin').firestore.FieldValue;
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

    static async createFolder(folder, token) {
        oAuth2Client.setCredentials(token);
        const drive = google.drive({ version: 'v3', auth: oAuth2Client });
        const folderMetadata = {
            name: folder.name,
            parents: [folder.parentId],
            mimeType: 'application/vnd.google-apps.folder',
          };
          try {
            const folder = await drive.files.create({
              resource: folderMetadata,
              fields: 'id',
            });
            return folder.data.id;
          } catch (err) {
            // TODO(developer) - Handle error
            throw err;
          }
    }

    static async uploadFiles(task) {
        // function for increasing progress count in db (using shards)
        function incrementCounter() {
            const taskRef = db.collection('tasks').doc(task.id);
            const shardRef = taskRef.collection('shards').doc("progress");
            return shardRef.set({count: FieldValue.increment(1)}, {merge: true});
        }

        oAuth2Client.setCredentials(task.token);
        const drive = google.drive({ version: 'v3', auth: oAuth2Client });
        await Promise.all(task.fileList.map(async (file) => {
            const fileMetadata = {
                name: file.name,
                parents: [ task.targetFolder ]
            };
            const media = {
                mimeType: file.type,
                body: fs.createReadStream(`${task.currentPath}/${file.name}`),
            };
            try {
                const upload = drive.files.create({
                    resource: fileMetadata,
                    media: media,
                    fields: "id",
                },
                (err, fileArg) => {
                    oAuth2Client.setCredentials(null);
                    if (err) {
                        console.error(err);
                    } 
                    incrementCounter()
                    return upload
                }
            );
            } catch (error) {
                throw error
            }
            
        }))
    }

    static async getFilePath(folderId, token) {
        const filePath = []
        oAuth2Client.setCredentials(token);
        const drive = google.drive({ version: 'v3', auth: oAuth2Client });

        while (folderId !== null) {
            const folder = await drive.files.get({
                fileId: folderId,
                fields: "parents, id, name"
            })
            filePath.push(folder.data.name)
            if (folder.data.parents !== undefined) {
                folderId = folder.data.parents[0]
            } else {
                folderId = null
            }   
        }
        return filePath.reverse().join("/")
        
    }

}

module.exports = Gdrive
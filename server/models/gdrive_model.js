const config = require("../config")
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

    static listRootFolder() {
        oAuth2Client.setCredentials(token.googleDrive.token);
        const drive = google.drive({ version: 'v3', auth: oAuth2Client });
        let parentID = 'root'
        return drive.files.list({
            'q': `'${parentID}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
            'pageSize': 10,
            'fields': "nextPageToken, files(id, name)"
        })
        .then(res => res.data.files)
    }
}

module.exports = Gdrive
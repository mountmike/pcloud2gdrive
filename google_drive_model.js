const config = require("./config")
const path = require("path")
const fs = require("fs")
const { google } = require("googleapis")
const oAuth2Client = new google.auth.OAuth2(
  config.gDriveAPI.clientId,
  config.gDriveAPI.clientSecret,
  config.gDriveAPI.redirectURI
)

oAuth2Client.setCredentials({ refresh_token: config.gDriveAPI.refreshToken })

const drive = new google.drive({
  version: 'v3',
  auth: oAuth2Client
})

const filePath = path.join(__dirname, 'pic.jpg')


class GoogleDrive {
    
  static async uploadFile() {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: 'beautifulgirl.jpg',
          mimeType: 'image/jpg'
        },
        media: {
          mimeType: 'image/jpg',
          body: fs.createReadStream(filePath)
        }
      })
      console.log(response.data);
  
    } catch (error) {
      console.log(error.message)
    }
  }

  static async getFileSync() {
    try {
      const request = drive.files.get({
        fileId: '18I1r6G0yG3r0zC0tJhUiUXuU3t0DdekI',
        fields: 'webContentLink, id, name'
      })
  
      request.execute(res => {
        if (res.webContentLink) {
          window.location.assign(res.webContentLink)
        } else {
          let formattedJson = JSON.stringify(res.result, null, 2)
          console.log(formattedJson)
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

}

module.exports = GoogleDrive
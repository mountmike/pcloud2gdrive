const config = require("../config")
const axios = require("axios")
const pcloudSdk = require('pcloud-sdk-js')
const fs = require("fs")
const { google } = require("googleapis")
const oAuth2Client = new google.auth.OAuth2(
    config.gDriveAPI.clientId,
    config.gDriveAPI.clientSecret,
    config.gDriveAPI.redirectURI
  )
global.locationid = 1;

async function getFileList(folderId) {
    const client = pcloudSdk.createClient("7M6F7Z8S42o7ZUFbW3uHpMj5sLhOq1MOJjS45VQ0k");
    const folders = await client.listfolder(folderId)
    return folders.contents.map(file => file.fileid)
}


async function getFileList2(folderId) {
    const client = pcloudSdk.createClient("7M6F7Z8S42o7ZUFbW3uHpMj5sLhOq1MOJjS45VQ0k");
    client.listfolder(folderId).then(res => console.log(res))
}

getFileList2(0)


async function transferFile(fileId, targetFolderId) {
    try { // connect to pCloud and download file
        const { data } = await axios.post(`https://api.pcloud.com/stat?username=micktharratt@hotmail.com&password=08Ooz9ZyWr6X&fileid=${fileId}`)
        const client = pcloudSdk.createClient(token.pcloud.access_token);
        client.downloadfile(fileId, `./tmp/${data.metadata.name}`).then(res => {
        // connect to gDrive and upload file
            oAuth2Client.setCredentials(token.googleDrive.token);
            const drive = google.drive({ version: 'v3', auth: oAuth2Client });
            const fileMetadata = {
                name: data.metadata.name,
                parents: [ targetFolderId ]
            };
            const media = {
                mimeType: data.metadata.type,
                body: fs.createReadStream(`./tmp/${data.metadata.name}`),
            };
            drive.files.create(
                {
                    resource: fileMetadata,
                    media: media,
                    fields: "id",
                },
                (err, file) => {
                    oAuth2Client.setCredentials(null);
                    if (err) {
                        console.error(err);
                    } else {
                        try {
                            fs.unlinkSync(`./tmp/${data.metadata.name}`)
                            console.log("success!")
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            );
        })
    } catch (error) {
        console.log(error)
    }
}

const testOriginFolderId = 16968679529
const testDestinationFolderId = "14pDdaBUUWZAt3vD05XCOiAT72HS7wrsA"
const testFileId = 49754337613

// transferFile(testFileId, testDestinationFolderId)



async function transferFolder(originFolderId, destinationFolderId) {
    const fileList = await getFileList(originFolderId)
    fileList.forEach(fileId => transferFile(fileId, destinationFolderId))
}

// transferFolder(testOriginFolderId, testDestinationFolderId)




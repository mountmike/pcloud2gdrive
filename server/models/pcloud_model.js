const config = require("../config")
const pCloudSdk = require('pcloud-sdk-js')
const axios = require('axios')
global.locationid = 1;

class Pcloud {

    static getToken(code) {
        return pCloudSdk.oauth.getTokenFromCode(code, config.pCloudAPI.clientId, config.pCloudAPI.appSecret)
    }

    static async listFolder(folderId, token) {
        const client = pCloudSdk.createClient(token)
        const contents = await client.listfolder(Number(folderId))
        return contents
    }

    static downloadFile(fileId, target, token) {
        console.log(fileId);
        const client = pCloudSdk.createClient(token)
        client.downloadfile(fileId, target)
    }

    static async downloadFiles(fileList, target, token) {
        const client = pCloudSdk.createClient(token)

        await Promise.all(fileList.map(async (file) => {
            const contents = await client.downloadfile(file.fileid, `${target}/${file.name}`)
          }));

     
    }

}

module.exports = Pcloud
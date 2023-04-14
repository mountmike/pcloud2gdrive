const config = require("../config")
const pCloudSdk = require('pcloud-sdk-js')
global.locationid = 1;

class Pcloud {

    static async listFolder(folderId, token) {
        const client = pCloudSdk.createClient(token)
        const contents = await client.listfolder(Number(folderId))
        return contents
    }

    static getToken(code) {
        return pCloudSdk.oauth.getTokenFromCode(code, config.pCloudAPI.clientId, config.pCloudAPI.appSecret)
    }

    static downloadFile(fileId, target, token) {
        const client = pCloudSdk.createClient(token)
        return client.downloadfile(fileId, target)
    }
}

module.exports = Pcloud
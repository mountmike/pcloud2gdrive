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

    static downloadFiles(fileList, target, token) {
        const client = pCloudSdk.createClient(token)
        fileList.forEach(file => {
            client.downloadfile(file.fileid, `${target}/${file.name}`)
        })
    }

    static async getPath(id, token) {
        // const { data } = await axios.post(`https://api.pcloud.com/stat?username=micktharratt@hotmail.com&password=08Ooz9ZyWr6X&fileid=28228302968`)
        // console.log(data);
    }
}

module.exports = Pcloud
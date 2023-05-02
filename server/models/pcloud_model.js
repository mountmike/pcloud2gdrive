const config = require("../config")
const pCloudSdk = require('pcloud-sdk-js')
const db = require("../db/firebase");
const FieldValue = require('firebase-admin').firestore.FieldValue;
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

    static async listFolderRecursive(folderId, token) {
        const client = pCloudSdk.createClient(token)
        const contents = await client.listfolder(Number(folderId), { recursive: 1 })
        return contents
    }

    static downloadFile(fileId, target, token) {
        const client = pCloudSdk.createClient(token)
        client.downloadfile(fileId, target)
    }

    static async downloadFiles(fileList, target, token, taskId) {
        // function for increasing progress count in db (using shards)
        function incrementCounter() {
            const taskRef = db.collection('tasks').doc(taskId);
            const shardRef = taskRef.collection('shards').doc("progress");
            return shardRef.set({count: FieldValue.increment(1)}, {merge: true});
          }
        const client = pCloudSdk.createClient(token)
        await Promise.all(fileList.map(async (file) => {
            try {
                const contents = await client.downloadfile(file.fileid, `${target}/${file.name}`)
                incrementCounter()
                return contents
            } catch (err) {
                throw err;
            }
            
        }));
    }

    static async getFilePath(folderId, token) {
        const filePath = []
        const client = pCloudSdk.createClient(token)
        while (folderId > 0) {
            const folder = await client.listfolder(Number(folderId))
            filePath.push(folder.name)
            folderId = folder.parentfolderid
        }
        filePath.push("Pcloud")
        return filePath.reverse().join("/")
        
    }

}

module.exports = Pcloud
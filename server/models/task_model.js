const db = require("../db/firebase");
const { v4: uuidv4 } = require('uuid');
const Pcloud = require("../models/pcloud_model.js")
const Gdrive = require("../models/gdrive_model")
const fs = require('fs');
const fsPromise = require("fs").promises
const path = require("path")

class Task {
    
    static async fetchAll() {
        const taskRef = db.collection('tasks')
        const snapshot = await taskRef.get() 
        let taskList = []
        snapshot.forEach(doc => taskList.push(doc.data()))
        return taskList
    }

    static async fetchById(taskId) {
        const taskRef = db.collection('tasks').doc(taskId)
        const doc = await taskRef.get()
        if (!doc.exists) {
            console.log('No such document!')
        } else {
            return doc.data()
        }
    }

    static async fetchFileList(taskId) {
        const taskRef = db.collection('tasks').doc(taskId).collection(`fileList`)
        const snapshot = await taskRef.get() 
        let fileList = []
        snapshot.forEach(file => fileList.push(file.data()))
        return fileList
    }

    static async create(task, pCloudToken, gDriveToken) {
        // create task document
        const taskId = uuidv4()
        const taskRef = db.collection('tasks').doc(taskId);
        await taskRef.set({
          name: task.taskName,
          id: taskId,
          originFolderId: task.originFolderId,
          targetFolderId: task.targetFolderId,
          originPath: await Pcloud.getFilePath(task.originFolderId, pCloudToken),
          targetPath: await Gdrive.getFilePath(task.targetFolderId, gDriveToken)
        });
        // build list of files from inside origin folder
        const fileList = await Pcloud.listFolderRecursive(task.originFolderId, pCloudToken)

        fileList.contents.forEach(file => {

            db.collection('tasks').doc(taskId).collection(`fileList`).doc(file.id).set(file);
        })
    }

    static async startTask(task) {
        const rootPath = path.resolve(__dirname, "../tmp", task.details.id) // const folderName = `/tmp/${task.details.id}`

        try {
            if (!fs.existsSync(rootPath)) {
                await fsPromise.mkdir(rootPath)
        }
        } catch (err) { 
        console.error(err);
        }

        async function transferFiles(fileList, rootPath, targetFolderId) {
            const folderList = fileList.filter(el => el.isfolder)

            if (folderList.length === 0) {
                await Pcloud.downloadFiles(fileList, rootPath, task.pCloudToken)
                Gdrive.uploadFiles({
                    fileList, 
                    currentPath: rootPath,
                    targetFolder: targetFolderId, 
                    token: task.gDriveToken
                })    
                return
            }

            for (const folder of folderList) {
                try {
                    // create new sub folders in /tmp folder
                    if (!fs.existsSync(path.resolve(rootPath, folder.name))) {
                        await fsPromise.mkdir(path.resolve(rootPath, folder.name))
                    }

                    // create new folder on google drive
                    const newFolderId = await Gdrive.createFolder({ name: folder.name, parentId: targetFolderId }, task.gDriveToken)
                    console.log("folder made");
                    // if more sub folders
                    if (folder.contents.length > 0) {
                        let newPath = path.resolve(rootPath, folder.name)
                        transferFiles(folder.contents, newPath, newFolderId)
                    }
                    await Pcloud.downloadFiles(fileList, rootPath, task.pCloudToken)
                    console.log("starting upload");
                    Gdrive.uploadFiles({
                        fileList, 
                        currentPath: rootPath,
                        targetFolder: targetFolderId, 
                        token: task.gDriveToken
                    })    

                } catch (err) { 
                    console.error(err);
                }
            }
            
        }
        
        transferFiles(task.fileList, rootPath, task.details.targetFolderId)


        // Gdrive.uploadFiles({
        //     fileList: task.fileList, 
        //     currentPath: folderName,
        //     targetFolder: task.details.targetFolderId, 
        //     token: task.gDriveToken
        // })    
    }
}

module.exports = Task
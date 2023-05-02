const db = require("../db/firebase");
const { v4: uuidv4 } = require('uuid');
const Pcloud = require("../models/pcloud_model.js")
const Gdrive = require("../models/gdrive_model")
const fs = require('fs');
const fsPromise = require("fs").promises
const path = require("path");

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
        // build list of files from inside origin folder
        const fileList = await Pcloud.listFolderRecursive(task.originFolderId, pCloudToken)
        let totalFiles = 0

        function getFileCount(fileList) {
            for (const file of fileList) {
                if (file.contents) {
                    getFileCount(file.contents)
                } else if (!file.isfolder && file.name !== ".DS_Store") {
                    totalFiles++
                }
            }
        }

        getFileCount(fileList.contents)

        // create task document
        const taskId = uuidv4()
        const taskRef = db.collection('tasks').doc(taskId);
        await taskRef.set({
          name: task.taskName,
          id: taskId,
          originFolderId: task.originFolderId,
          targetFolderId: task.targetFolderId,
          originPath: await Pcloud.getFilePath(task.originFolderId, pCloudToken),
          targetPath: await Gdrive.getFilePath(task.targetFolderId, gDriveToken),
          totalFiles,
          isComplete: false
        });
        
        // add document to sub collection "fileList" for each file in list
        fileList.contents.forEach(file => {

            db.collection('tasks').doc(taskId).collection(`fileList`).doc(file.id).set(file);
        })
    }

    static async startTask(task) {
        const rootPath = path.resolve(__dirname, "../tmp", task.details.id)

        // reset progress status
        const taskRef = db.collection('tasks').doc(task.details.id);
        const shardRef = taskRef.collection('shards').doc("progress");
        shardRef.set({count: 0});
        
        try {
            if (!fs.existsSync(rootPath)) {
                await fsPromise.mkdir(rootPath)
        }
        } catch (err) { 
        console.error(err);
        }

        async function transferFiles(fileList, rootPath, targetFolderId) {
            const folderList = fileList.filter(el => el.isfolder)
            const filesOnly = fileList.filter(file => !file.isfolder && file.name !== ".DS_Store")

            if (folderList.length === 0) {
                await Pcloud.downloadFiles(filesOnly, rootPath, task.pCloudToken, task.details.id)
                await Gdrive.uploadFiles({
                    fileList: filesOnly, 
                    currentPath: rootPath,
                    targetFolder: targetFolderId, 
                    token: task.gDriveToken,
                    id: task.details.id
                }); 
                return
            }

            await Pcloud.downloadFiles(filesOnly, rootPath, task.pCloudToken, task.details.id)
            await Gdrive.uploadFiles({
                fileList: filesOnly, 
                currentPath: rootPath,
                targetFolder: targetFolderId, 
                token: task.gDriveToken,
                id: task.details.id
            })   
            

            for (const folder of folderList) {
                try {
                    // create new sub folders in /tmp folder
                    if (!fs.existsSync(path.resolve(rootPath, folder.name))) {
                        await fsPromise.mkdir(path.resolve(rootPath, folder.name))
                    }

                    // create new folder on google drive
                    const newFolderId = await Gdrive.createFolder({ name: folder.name, parentId: targetFolderId }, task.gDriveToken)
                    
                    // if more sub folders
                    if (folder.contents.length > 0) {
                        const newPath = path.resolve(rootPath, folder.name)
                        await transferFiles(folder.contents, newPath, newFolderId)
                    }
                    

                } catch (err) { 
                    console.error(err);
                }
            }
            
        }
        
        await transferFiles(task.fileList, rootPath, task.details.targetFolderId)

        // await fsPromise.rmdir(rootPath, { recursive: true, force: true })
        
        // console.log(`deleted ${rootPath}`)

        let finalCount = await shardRef.get()
        if (!finalCount.exists) {
            console.log('No such document!');
        } else {
            finalCount = finalCount.data().count;
        }
        console.log(finalCount);

        // if (finalCount === task.details.total)
    }

    static async deleteTask(id) {
        const res = await db.collection('tasks').doc(id).delete();
        return res
    }
}

module.exports = Task
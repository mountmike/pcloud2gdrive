const db = require("../db/firebase");
const Pcloud = require("../models/pcloud_model.js")

class Task {
    
    static async fetchAll() {
        const taskRef = db.collection('tasks')
        const snapshot = await taskRef.get() 
        let taskList = []
        snapshot.forEach(doc => taskList.push(doc.data()))
        return taskList
    }

    static async create(task, pCloudToken) {
        // create task document
        // const originPath = await Pcloud.
        const taskRef = db.collection('tasks').doc(task.taskName);
        await taskRef.set({
          name: task.taskName,
          id: 1,
          originFolderId: task.originFolderId,
          targetFolderId: task.targetFolderId
        });
        // build list of files from inside origin folder
        const fileList = await Pcloud.listFolder(task.originFolderId, pCloudToken)
        console.log(fileList);
        fileList.contents.forEach(file => {
            db.collection('tasks').doc(task.taskName).collection(`fileList`).doc(file.id).set(file);
        })
    }
}

module.exports = Task

/*  old SQL db calls

    static getAll() {
        const sql = `SELECT * FROM tasks`
        return db.query(sql).then(tasks => tasks.rows)
    }

    static create(task) {
        const { userId, taskName, originId, destinationId } = task
        const sql = `INSERT INTO tasks (user_id, task_name, origin_folder, destination_folder) values ($1, $2, $3, $4);`
        db.query(sql,[userId, taskName, originId, destinationId])
    }
*/
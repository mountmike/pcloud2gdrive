const db = require("../db/firebase");
const Pcloud = require("../models/pcloud_model.js")

class Task {
    
    static getAll() {
        // const sql = `SELECT * FROM tasks`
        // return db.query(sql).then(tasks => tasks.rows)
    }

    static async create(task) {
        // create task document
        const docRef = db.collection('tasks').doc(task.taskName);
        await docRef.set({
          name: task.taskName,
          id: 1,
          originFolderId: task.originFolderId,
          targetFolderId: task.targetFolderId
        });
        // build list of files from inside origin folder
        Pcloud.listFolder(task.originFolderId)
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
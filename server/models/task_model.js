const db = require("../db/firebase");

class Task {
    
    static getAll() {
        // const sql = `SELECT * FROM tasks`
        // return db.query(sql).then(tasks => tasks.rows)
    }

    static async create(task) {
        const docRef = db.collection('tasks').doc(task.taskName);

        await docRef.set({
          first: 'Ada',
          last: 'Lovelace',
          born: 1815
        });
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
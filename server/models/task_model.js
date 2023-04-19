const db = require("../db");

class Task {
    
    static getAll() {
        const sql = `SELECT * FROM tasks`
        return db.query(sql).then(tasks => tasks.rows)
    }

    static createTask(task) {
        const { userId, taskName, originId, destinationId } = task
        const sql = `INSERT INTO tasks (user_id, task_name, origin_folder, destination_folder) values ($1, $2, $3, $4);`
        db.query(sql,[userId, taskName, originId, destinationId])
    }
}

module.exports = Task
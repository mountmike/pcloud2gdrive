const db = require("../db");

class User {
    static getByEmail(email) {
        return db.query(`SELECT * from users where email = $1`, [email]).then(user => user.rows)    
    }

    static addNewUser(username, email, digestedPassword) {
        return db.query('INSERT INTO users (username, email, password_digest) VALUES ($1, $2, $3)', [username, email, digestedPassword])
    } 
}

module.exports = User

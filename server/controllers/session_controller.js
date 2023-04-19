const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user_model")

router.post("/", (req, res, next) => {
    const { email, password } = req.body
    try {
        User.getByEmail(email)
        .then(user => {
            if (user.length === 0) {
                return res.redirect("/") // no records found, stay at login page
            } else {
                user = user[0]
                bcrypt.compare(password, user.password_digest, (err, result) => {
                    if (result) {
                        req.session.userId = user.id
                        res.redirect("/app");
                    } else {
                        next(err)
                        res.redirect("/");
                    }
                })
            }
        })
    } catch (err) {
        next(err)
    }
    
});

module.exports = router
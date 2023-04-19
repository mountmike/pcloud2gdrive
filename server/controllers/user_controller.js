const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user_model")

router.get("/new", (req, res) => {
    res.render("new_user")
});

router.post("/", (req, res, next) => {
    const { username, email, password } = req.body
    try {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, digestedPassword) => {
                User.addNewUser(username, email, digestedPassword)
                res.redirect("/app")
            })
        
        })
    } catch (err) {
        next(err)
    }
});

module.exports = router
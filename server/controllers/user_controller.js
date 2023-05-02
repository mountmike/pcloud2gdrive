const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user_model")

router.post("/", (req, res, next) => {
    const { email, password, username } = req.body
    try {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, digestedPassword) => {
                User.addNewUser(username, email, digestedPassword)
                    .then(response => console.log(response))
            })
        
        })
    } catch (err) {
        next(err)
    }
});

module.exports = router
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const User = require("../models/user_model")

function createJsonWebToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "24h" })
  }

router.post("/", async (req, res, next) => {
    const { email, password } = req.body

    try {
        let [ user ] = await User.getByEmail(email)

        let match = await bcrypt.compare(password, user.password_digest)
    
        if (!match) throw new Error("invalid email or password")
    
        let token = createJsonWebToken({ uid: user.id, username: user.username, email: user.email})
        req.session.userId = user.id
        res.json(token)
      } catch (err) {
        console.log(err)
        next(err)
      }


    // try {
    //     User.getByEmail(email)
    //     .then(user => {
    //         if (user.length === 0) {
    //             throw new error("invalid username or password")
    //         } else {
    //             user = user[0]
    //             bcrypt.compare(password, user.password_digest, (err, result) => {
    //                 if (result) {
    //                     req.session.userId = user.id
    //                     res.redirect("/app");
    //                 } else {
    //                     next(err)
    //                     res.redirect("/");
    //                 }
    //             })
    //         }
    //     })
    // } catch (err) {
    //     next(err)
    // }
    
});

module.exports = router
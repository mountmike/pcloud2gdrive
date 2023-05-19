const config = require("../config")
const express = require("express");
const router = express.Router();
const Pcloud = require("../models/pcloud_model.js")
const User = require("../models/user_model.js")


router.get("/auth-token", (req, res, next) => {
  const { code } = req.query
  Pcloud.getToken(code)
  .then(token => {
    // User.addAccessToken()
    res.send("<script>window.close();</script > ")
  })
  .catch(next)
});

router.get('/folder/:folderId', async (req, res, next) => {
  const { folderId } = req.params

  const token = req.session.pCloud.access_token
  try {
    Pcloud.listFolder(folderId, token)
    .then(contents => res.json(contents)) 
  } catch (err) {
    next(err)
  }
});





module.exports = router
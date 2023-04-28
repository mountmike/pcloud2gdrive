const config = require("../config")
const express = require("express");
const router = express.Router();
const axios = require("axios")
const Pcloud = require("../models/pcloud_model.js")


router.get("/authURL", (req, res, next) => {
    res.redirect(`https://my.pcloud.com/oauth2/authorize?redirect_uri=${config.pCloudAPI.redirectURI}&client_id=${config.pCloudAPI.clientId}&response_type=code`)
})

router.get("/auth-token", (req, res, next) => {
  const { code } = req.query
  Pcloud.getToken(code)
  .then(resp => {
    req.session.pCloud = resp
    res.send("<script>window.close();</script > ")
  })
});

router.get("/checksession", (req, res) => {
  console.log(req.session);
  res.json(req.session.pCloud)
})

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
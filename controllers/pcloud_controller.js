const config = require("../config")
const express = require("express");
const router = express.Router();
const fs = require("fs")
const axios = require("axios")
const pCloudSdk = require('pcloud-sdk-js')
global.locationid = 1;

router.get("/authURL", (req, res, next) => {
    res.redirect(`https://my.pcloud.com/oauth2/authorize?redirect_uri=${config.pCloudAPI.redirectURI}&client_id=${config.pCloudAPI.clientId}&response_type=code`)
})

router.get("/auth-token", (req, res, next) => {
  const { code } = req.query
  pCloudSdk.oauth.getTokenFromCode(code, config.pCloudAPI.clientId, config.pCloudAPI.appSecret)
  .then(resp => {
    req.session.pCloud = resp
    res.send("success")
  })
});

router.get('/folders/:folderId', async (req, res, next) => {
  const { folderId } = req.params
  try {
    const client = pCloudSdk.createClient(req.session.pCloud.access_token)
    const folders = await client.listfolder(Number(folderId))
    res.json(folders.contents)
  } catch (err) {
    next(err)
  }
  
  // return folders.contents.map(file => file.fileid)

  // const client = pcloudSdk.createClient(token.pcloud.access_token);
  // client.listfolder(0).then((fileMetadata) => {
  //     res.send(fileMetadata)
  //   });
});

router.post("/downloadFile/:id", (req, res) => {
    const { id } = req.params;
    let metadata;
    axios.post(`https://api.pcloud.com/stat?username=micktharratt@hotmail.com&password=08Ooz9ZyWr6X&fileid=${id}`).then(resp => {
      const client = pcloudSdk.createClient(token.pcloud.access_token);
      client.downloadfile(id, `./tmp/${resp.data.metadata.name}`)
      .then(file => {
      res.send("success !" + file)
    })
    .catch(error)
    })
})


module.exports = router
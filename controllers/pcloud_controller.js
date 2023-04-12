const config = require("../config")
const express = require("express");
const router = express.Router();
const fs = require("fs")
const axios = require("axios")
const pCloudSdk = require('pcloud-sdk-js')
global.location = 1;

router.get("/authURL", (req, res, next) => {
    res.redirect(`https://my.pcloud.com/oauth2/authorize?redirect_uri=${config.pCloudAPI.redirectURI}&client_id=${config.pCloudAPI.clientId}&response_type=code`)
})

router.get("/get-token", (req, res, next) => {
  if (req.query.code) {
    req.session.pCloud = req.query
    res.send("success")
  }
});

router.post('/readFolders', (req, res) => {
    const client = pcloudSdk.createClient(token.pcloud.access_token);
    client.listfolder(0).then((fileMetadata) => {
        res.send(fileMetadata)
      });
});

router.post('/uploadFile', (req, res) => {
    var form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send(err);

        const media = {
            mimeType: files.file.type,
            body: fs.createReadStream(files.file.filepath),
        };
        const client = pcloudSdk.createClient(token.pcloud.access_token);

        client.upload(files.file.filepath, 0, {
            onBegin: () => {
              console.log('started');
            },
            onProgress: function(progress) {
              console.log(progress.loaded, progress.total);
            },
            onFinish: function(fileMetadata) {
              console.log('finished', fileMetadata);
              fileMetadata.name = "filename.jpg"
              res.send('Successful')
            }
          }).catch(function(error) {
            console.error(error);
        })      
    }) 
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
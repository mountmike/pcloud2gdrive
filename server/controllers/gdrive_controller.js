const config = require("../config")
const express = require("express");
const router = express.Router();
const fs = require("fs")
const { google } = require("googleapis")
const oAuth2Client = new google.auth.OAuth2(
    config.gDriveAPI.clientId,
    config.gDriveAPI.clientSecret,
    config.gDriveAPI.redirectURI
  )

const SCOPE = ["https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file"]

router.get("/", (req, res, next) => {
    try {
        res.send("here")
    } catch (error) {
        next(error)
    }
})

router.get("/authURL", (req, res, next) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPE,
    })
    res.redirect(authUrl)
})

router.get("/auth-token", (req, res) => {
    oAuth2Client.getToken(req.query.code, (err, token) => {
        if (err) {
            console.log("Error receiving your token", err);
            return res.status(400).send('Error receiving your token')
        } else {
            req.session.Gdrive = token
            res.send("success")
        }
    })
})

router.post('/user-info', (req, res) => {
    if (req.body.token == null) return res.status(400).send('Token not found');
    oAuth2Client.setCredentials(req.body.token);
    const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });

    oauth2.userinfo.get((err, response) => {
        if (err) res.status(400).send(err);
        console.log(response.data);
        res.send(response.data);
    })
});

router.post('/read-files', (req, res) => {
    if (req.body.token == null) return res.status(400).send('Token not found');
    oAuth2Client.setCredentials(req.body.token);
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    drive.files.list({
        pageSize: 10,
    }, (err, response) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            return res.status(400).send(err);
        }
        const files = response.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
        res.send(files);
    });
});

router.get('/folders/:folderId', (req, res) => {
    let { folderId }  = req.params
    oAuth2Client.setCredentials(req.session.Gdrive);
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and 'root' in parents`,
        fields: 'nextPageToken, files(id, name)',
        spaces: 'drive',
    }, (err, response) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            return res.status(400).send(err);
        }
        const folders = response.data.files
        res.json(folders);
    });
});

router.post('/upload-file', (req, res) => {
    // var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send(err);
        const token = JSON.parse(fields.token);
        console.log(token)
        if (token == null) return res.status(400).send('Token not found');
        oAuth2Client.setCredentials(token);
        console.log(files.file);
        const drive = google.drive({ version: "v3", auth: oAuth2Client });
        const fileMetadata = {
            name: files.file.name,
        };

        console.log("path: " + JSON.stringify(files.file));

        const media = {
            mimeType: files.file.type,
            body: fs.createReadStream(files.file.filepath),
        };
        drive.files.create(
            {
                resource: fileMetadata,
                media: media,
                fields: "id",
            },
            (err, file) => {
                oAuth2Client.setCredentials(null);
                if (err) {
                    console.error(err);
                    res.status(400).send(err)
                } else {
                    res.send('Successful')
                }
            }
        );
    });
});

router.post('/delete-file/:id', (req, res) => {
    if (req.body.token == null) return res.status(400).send('Token not found');
    oAuth2Client.setCredentials(req.body.token);
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    var fileId = req.params.id;
    drive.files.delete({ 'fileId': fileId }).then((response) => { res.send(response.data) })
});

router.post('/download-file/:id', (req, res) => {
    if (req.body.token == null) return res.status(400).send('Token not found');
    oAuth2Client.setCredentials(req.body.token);
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    var fileId = req.params.id;
    drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' },
        function (err, response) {
            response.data
                .on('end', () => {
                    console.log('Done');
                })
                .on('error', err => {
                    console.log('Error', err);
                })
                .pipe(res);
        });

});

module.exports = router
const config = require("../config")
const express = require("express");
const router = express.Router();
const Task = require("../models/task_model")
const Pcloud = require("../models/pcloud_model.js")
const pCloudSdk = require('pcloud-sdk-js')
const fs = require("fs")

const { google } = require("googleapis")
const oAuth2Client = new google.auth.OAuth2(
    config.gDriveAPI.clientId,
    config.gDriveAPI.clientSecret,
    config.gDriveAPI.redirectURI
  )

router.get("/", (req, res, next) => {
    Task.getAll().then(tasks => res.json(tasks))
})

router.post("/", async (req, res, next) => {
    console.log(req.body);
})

// router.post("/", async (req, res, next) => {
//     // const token = req.session.pCloud.access_token
//     const tmpPcloudToken = "7M6F7ZugV2gwJoAOmZOko2o7ZwXusKnWPhS8RDQ2qjGpbFHmMCNwV"
//     const tmpGdriveToken = {
//             access_token: 'ya29.a0Ael9sCMgYsyah9GLV9yzOGvhZ2bAzCFhaRG32z4L_1eeVyGm2F9DOt-VlMxLUm7Be-LcIPkXdBQiIx6Uhxp3NfFBpvlSi9uG_ZR_2UZ16pHKalWCw1Cij0a8LOoUpZ9dGiGvcdKRYKdXEMx5pHC3Qi8Op2KrnwaCgYKAeQSARESFQF4udJhf9cTVjbncQA1tBmzk6gi4w0165',
//             scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file',
//             token_type: 'Bearer',
//             id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk2OTcxODA4Nzk2ODI5YTk3MmU3OWE5ZDFhOWZmZjExY2Q2MWIxZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MDY4NDk2MTA4MDItbG9yZGRhdXU3Nzl0aDRqM2NvYmo5YjA2M2VkYjA0NDIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MDY4NDk2MTA4MDItbG9yZGRhdXU3Nzl0aDRqM2NvYmo5YjA2M2VkYjA0NDIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTM5NzY1NDYyODk0NjM1NDE0MDciLCJhdF9oYXNoIjoicU1vMlRkSkJyWlZIZ1VzZkNYYld5dyIsIm5hbWUiOiJNaWNoYWVsIFRoYXJyYXR0IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFozeWtTem9OUU9mZkp5bElLbXkwRGpNbVNEYmRaSElqS1c4dUUtU3c9czk2LWMiLCJnaXZlbl9uYW1lIjoiTWljaGFlbCIsImZhbWlseV9uYW1lIjoiVGhhcnJhdHQiLCJsb2NhbGUiOiJlbi1HQiIsImlhdCI6MTY4MTQ3MTkxNSwiZXhwIjoxNjgxNDc1NTE1fQ.f1v1yqFFBYRQVa0SebDFCZviJoc4abPqV2mf2gq1wkq9NOR4_6cspxn-ag5AmER_QDgHeWip5Bg7gS8piZb4izjgvQzEEtYoX1MKlqWd-kHREn91LV6sqoxHfk9scKOxgBj6DxdawIYbwkl11Rot22v7TjlnYh1AskqHVCE7K6VvewBULK_TzCs74OMfM4iKxBG0QrEekSlZd-ZLqwScphO1HhT2uQVK_kha5i35AMazcG2LHlgJc98cQipNRQohp99g6ZsD-eVAFz4L9CoZxzx1AZetvZp2R-u0OAsObuwX4xFwVvZBHvpH2caNFgqxsiou8QSK5Z75Lor12q_D2Q',
//             expiry_date: 1681475514426
//     }
//     const task = { 
//         userId: req.session.userId,
//         taskName: req.body.taskName, 
//         originId: req.body.originId, 
//         destinationId: req.body.destinationId
//     }
//     Task.createTask(task)
//     const pcloudClient = pCloudSdk.createClient(tmpPcloudToken)
//     const fileList = await pcloudClient.listfolder(16968679529)
//     fileList.contents.forEach(file => {
//         pcloudClient.downloadfile(file.fileid, `./tmp/${file.name}`).then(response => {
            
//             oAuth2Client.setCredentials(tmpGdriveToken);
//             const gdriveClient = google.drive({ version: 'v3', auth: oAuth2Client });
//             const fileMetadata = {
//                 name: file.name,
//                 parents: [ task.destinationId ]
//             };
//             const media = {
//                 mimeType: file.type,
//                 body: fs.createReadStream(`./tmp/${file.name}`),
//             };
//             gdriveClient.files.create(
//                 {
//                     resource: fileMetadata,
//                     media: media,
//                     fields: "id",
//                 },
//                 (err, file) => {
//                     oAuth2Client.setCredentials(null);
//                     if (err) {
//                         console.error(err);
//                     } else {
//                         try {
//                             fs.unlinkSync(`./tmp/${file.name}`)
//                             console.log("success!")
//                         } catch (error) {
//                             console.log(error)
//                         }
//                     }
//                 }
//             );
//         })
//     })
    

// })

module.exports = router
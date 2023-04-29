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
    const taskDetails = req.body
    const pCloudToken = req.session.pCloud.access_pCloudToken
    Task.create(taskDetails, pCloudToken)
})

module.exports = router
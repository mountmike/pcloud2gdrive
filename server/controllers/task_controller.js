const config = require("../config")
const express = require("express");
const router = express.Router();
const Task = require("../models/task_model")


router.get("/", (req, res, next) => {
    Task.fetchAll().then(tasks => res.json(tasks))
})

router.post("/", async (req, res, next) => {
    const taskDetails = req.body
    const pCloudToken = req.session.pCloud.access_token
    Task.create(taskDetails, pCloudToken)
})

router.post('/start', async (req, res, next) => {
    const task = await Task.fetchById(req.body.taskId)
    const fileList = await Task.fetchFileList(req.body.taskId)
    const taskObj = {
        details: task,
        fileList,
        pCloudToken: req.session.pCloud.access_token,
        gDriveToken: req.session.Gdrive
    }
    Task.startTask(taskObj)
})

module.exports = router
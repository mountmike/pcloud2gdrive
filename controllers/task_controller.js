const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const Task = require("../models/task_model")

router.get("/", (req, res, next) => {
    Task.getAll().then(tasks => res.json(tasks))
})

router.post("/", (req, res, next) => {
    const task = { 
        userId: req.session.userId,
        taskName: req.body.taskName, 
        originId: req.body.originId, 
        destinationId: req.body.destinationId
    }
    
    Task.createTask(task)
})

module.exports = router
const express = require("express")
const app = express()
const config = require("./config")
const cors = require("cors")
const pgSession = require('connect-pg-simple')(session);

const gDriveController = require("./controllers/google_drive_controller")
const pCloudController = require("./controllers/pcloud_controller")
const Pcloud = require("./models/pcloud_model.js")
const Gdrive = require("./models/gdrive_model.js")


app.set("view engine", "ejs")

app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require("./middlewares/method_override"))

app.use("/gdrive", gDriveController)
app.use("/pcloud", pCloudController)

app.get("/", (req, res) => {
  res.render('home')
})

app.get("/chose-folders", (req, res) => {
  let pCloudFolders;
  let gDriveFolders;
  Pcloud.listRootFolder()
  .then(folders => {
    pCloudFolders = folders
    return Gdrive.listRootFolder()
  })
  .then(folders => {
    gDriveFolders = folders
    res.render("chose_folder", { pCloudFolders, gDriveFolders })
  })
})

app.post("/build-task", (req, res) => {
  const {originFolderSelection, destinationFolderSelection} = req.body
  

  res.render("build_task")
})

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`)
})

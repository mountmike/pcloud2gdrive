const express = require("express")
const app = express()
const config = require("./config")
const cors = require("cors")
const session = require('express-session');
const db = require("./db");
const pgSession = require('connect-pg-simple')(session);

const userController = require("./controllers/user_controller")
const sessionController = require("./controllers/session_controller")
const gDriveController = require("./controllers/gdrive_controller")
const pCloudController = require("./controllers/pcloud_controller")

const Pcloud = require("./models/pcloud_model.js")
const Gdrive = require("./models/gdrive_model.js")


app.set("view engine", "ejs")

app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(require("./middlewares/method_override"))
app.use(session({
  store: new pgSession({
    pool : db,                // Connection pool
    tableName: "session"
  }),
  secret: process.env.SESSION_SECRET || "godogsgo",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  // Insert express-session options here
}));

app.use("/user", userController)
app.use("/session", sessionController)
app.use("/gdrive", gDriveController)
app.use("/pcloud", pCloudController)

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/app", (req, res) => {
  console.log(req.session);
  res.render("app");
});


app.get("/add-cloud", (req, res) => {
  res.render("add_cloud");
});


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

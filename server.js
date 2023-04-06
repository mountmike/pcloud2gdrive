const express = require("express")
const app = express()
const config = require("./config")
const cors = require("cors")
const expressLayouts = require("express-ejs-layouts")
const gDriveController = require("./controllers/google_drive_controller")


const GoogleDrive = require("./google_drive_model")

app.set("view engine", "ejs")

app.use(express.json())
app.use(cors())
app.use(express.static("public"))
app.use(express.json())
app.use(expressLayouts)
app.use(express.urlencoded({ extended: true }))
app.use(require("./middlewares/method_override"))

app.use("/gdrive", gDriveController)

app.get("/", (req, res) => {
  res.render("home")
})

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`)
})

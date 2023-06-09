require("dotenv").config()

let missing = ["DATABASE_URL", "GDRIVE_CLIENT_ID", "GDRIVE_CLIENT_SECRETE", "GDRIVE_REDIRECT_URI", "PCLOUD_CLIENT_ID", "PCLOUD_APP_SECRET", "PCLOUD_REDIRECT_URI"].filter(
  key => process.env[key] === undefined
)

if (missing.length > 0) {
  throw Error(`missing environment variables for ${missing.join(", ")}`)
}

module.exports = {
  port: process.env.PORT,
  db: {
    connectionString: process.env.DATABASE_URL,
    user: "postgres",
    port: 5432,
    password: process.env.PG_PASSWORD,
    database: "pcloud2gdrive"

  },
  gDriveAPI: {
    clientId: process.env.GDRIVE_CLIENT_ID,
    clientSecret: process.env.GDRIVE_CLIENT_SECRETE,
    redirectURI: process.env.GDRIVE_REDIRECT_URI,
    refreshToken: process.env.GDRIVE_REFRESH_TOKEN
  },
  pCloudAPI: {
    clientId: process.env.PCLOUD_CLIENT_ID,
    appSecret: process.env.PCLOUD_APP_SECRET,
    redirectURI: process.env.PCLOUD_REDIRECT_URI
  }
}

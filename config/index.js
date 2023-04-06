require("dotenv").config()

let missing = ["PORT", "DATABASE_URL", "CLIENT_ID", "CLIENT_SECRETE", "REDIRECT_URI", "REFRESH_TOKEN"].filter(
  key => process.env[key] === undefined
)

if (missing.length > 0) {
  throw Error(`missing environment variables for ${missing.join(", ")}`)
}

module.exports = {
  port: process.env.PORT,
  db: {
    connectionString: process.env.DATABASE_URL,
  },
  gDriveAPI: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRETE,
    redirectURI: process.env.REDIRECT_URI,
    refreshToken: process.env.REFRESH_TOKEN
  }
}

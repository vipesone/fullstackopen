require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
let PORT = 3003

module.exports = {
  MONGODB_URI,
  PORT
}

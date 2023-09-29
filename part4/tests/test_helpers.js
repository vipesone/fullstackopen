require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getLoginToken = async () => {
  const username = process.env.TEST_USERNAME
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(process.env.TEST_PASSWORD, user.passwordHash)

  if (user && passwordCorrect) {
    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    return token
  }
}

module.exports = {
  usersInDb,
  getLoginToken
}

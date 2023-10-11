const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const middleware = require('./utils/middleware')

const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const blogsRouter = require('./controller/blogs')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controller/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app

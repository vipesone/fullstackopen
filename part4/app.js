const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const middleWare = require('./utils/middleware')

const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const blogsRouter = require('./controller/blogs')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use(middleWare.tokenExtractor)
app.use(middleWare.errorHandler)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)

module.exports = app

const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const middleWare = require('./utils/middleware')

const blogsRouter = require('./controller/blogs')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use(middleWare.errorHandler)

module.exports = app

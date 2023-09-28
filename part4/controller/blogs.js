const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('', async(request, response) => {
  const blog = new Blog({ ...request.body, likes: 0 })
  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

module.exports = blogsRouter

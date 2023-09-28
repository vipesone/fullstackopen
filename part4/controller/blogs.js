const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', async(request, response) => {
  const blog = new Blog({ ...request.body, likes: 0 })
  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = {
    title: request.body.title,
    likes: request.body.likes,
    author: request.body.author,
    url: request.body.url
  }

  const afterUpdate = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.status(200).json(afterUpdate)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter

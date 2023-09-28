const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
  const blog = new Blog({ ...request.body, likes: 0 })
  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const blogFromDb = await Blog.findById(request.params.id)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { ...request.body, ...blogFromDb }, { new: true })
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter

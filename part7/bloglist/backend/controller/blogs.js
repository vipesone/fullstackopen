const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = new Blog({ likes: 0, ...request.body, user: user._id })
  const newBlog = await blog.save()

  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

  response.status(201).json(newBlog)
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const updatedBlog = {
    title: request.body.title,
    likes: request.body.likes,
    author: request.body.author,
    url: request.body.url
  }

  const afterUpdate = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true
  }).populate('user')
  response.status(200).json(afterUpdate)
})

blogsRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
  const comment = new Comment({ ...request.body, blog: request.params.id })
  const newComment = await comment.save()

  const blog = await Blog.findById(request.params.id)

  blog.comments = blog.comments.concat(newComment._id)

  await blog.save()

  response.status(201).json(newComment)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user.id) {
    return response.status(401).json({ error: 'operation not permitted for current user' })
  }

  await Blog.findByIdAndRemove(request.params.id)

  if (user.blogs) {
    user.blogs = user.blogs.filter((id) => id !== request.params.id)
    await user.save()
  }

  response.status(204).end()
})

module.exports = blogsRouter

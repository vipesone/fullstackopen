const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', async(request, response) => {
  let userId = null
  if (!request.body.userId) {
    const users = await User.find({})

    const firstUser = [...users].shift()

    userId = firstUser.id
  } else {
    userId = request.body.userId
  }
  const user = await (User.findById(userId))
  const blog = new Blog({ likes: 0, ...request.body, user: user._id })
  const newBlog = await blog.save()

  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()

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

  if (request.body.userId) {
    let user = User.findById(request.body.userId)
    user.blogs = user.blogs.filter((id => id !== request.params.id))
    await user.save()
  }

  response.status(204).end()
})

module.exports = blogsRouter

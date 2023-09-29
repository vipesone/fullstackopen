/*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testHelpers = require('./test_helpers')

const blogsToTestWith = [
  {
    'title': 'React patterns',
    'author': 'Michael Chan',
    'url': 'https://reactpatterns.com/',
    'likes': 7
  },
  {
    'title': 'Go To Statement Considered Harmful',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    'likes': 5
  },
  {
    'title': 'Canonical string reduction',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    'likes': 12
  },
  {
    'title': 'First class tests',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    'likes': 10
  },
  {
    'title': 'TDD harms architecture',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    'likes': 0
  },
  {
    'title': 'Type wars',
    'author': 'Robert C. Martin',
    'url': 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    'likes': 2
  }
]

const newBlogPostToTestWith = {
  'title': 'What\'s new in Svelte: September 2023',
  'author': 'Dani Sandoval',
  'url': 'https://svelte.dev/blog/whats-new-in-svelte-september-2023',
  'likes': 1
}

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(blogsToTestWith)
})
describe('blog API', () => {
  test('returns correct amont of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogsToTestWith.length)
  })
  test('returns blogs with ids defined', async () => {
    const response = await api.get('/api/blogs')

    const blogItem = [...response.body].shift()
    expect(blogItem.id).toBeDefined()
  })
  test('can not add new blog post without token', async () => {
    const insertResponse = await api
      .post('/api/blogs')
      .send(newBlogPostToTestWith)
    expect(insertResponse.status).toBe(401)
  })
  test('can add new blog posts', async () => {
    const token = await testHelpers.getLoginToken()

    const insertResponse = await api
      .post('/api/blogs')
      .send(newBlogPostToTestWith)
      .set('Authorization', `Bearer ${token}`)

    const response = await api.get('/api/blogs')

    expect(insertResponse.body.likes).toBe(newBlogPostToTestWith.likes)

    expect(response.body).toHaveLength(blogsToTestWith.length + 1)
  })
  test('will default blog post likes to zero', async () => {
    const token = await testHelpers.getLoginToken()
    const { likes, ...newBlogPostWithoutLike } = newBlogPostToTestWith
    const response = await api
      .post('/api/blogs')
      .send(newBlogPostWithoutLike)
      .set('Authorization', `Bearer ${token}`)

    expect(response.body.likes).toBe(0)
  })
  test('will not allow blog post without title', async () => {
    const token = await testHelpers.getLoginToken()
    const { title, ...newBlogPostWithoutTitle } = newBlogPostToTestWith
    const response = await api
      .post('/api/blogs')
      .send(newBlogPostWithoutTitle)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })
  test('will not allow blog post without URL', async () => {
    const token = await testHelpers.getLoginToken()
    const { url, ...newBlogPostWithoutURL } = newBlogPostToTestWith
    const response = await api
      .post('/api/blogs')
      .send(newBlogPostWithoutURL)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })
  test('can delete single blog post', async () => {
    const token = await testHelpers.getLoginToken()

    const insertResponse = await api
      .post('/api/blogs')
      .send(newBlogPostToTestWith)
      .set('Authorization', `Bearer ${token}`)

    const response = await api
      .delete(`/api/blogs/${insertResponse.body.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(204)

    const afterDelete = await api.get('/api/blogs')

    const foundBlog = afterDelete.body.filter((blog) => blog.id === insertResponse.body.id)

    expect(foundBlog).toHaveLength(0)
  })
  test('can update single blog post', async () => {
    const initialResponse = await api.get('/api/blogs')

    const firstElement = [...initialResponse.body].shift()

    const newLikes = firstElement.likes + 25

    const afterUpdate = await api
      .put(`/api/blogs/${firstElement.id}`)
      .send({ ...firstElement, ...{ likes: newLikes } })

    expect(afterUpdate.status).toBe(200)

    expect(afterUpdate.body.likes).toBe(newLikes)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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
  'likes': 0
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
  test('can add new blog posts', async () => {
    await api.post('/api/blogs').send(newBlogPostToTestWith)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogsToTestWith.length + 1)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})

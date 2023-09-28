const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helpers')

describe('user API', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('adminpassword', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('can add new user', async () => {
    const usersInitially = await helper.usersInDb()

    const newUser = {
      username: 'mattimeikalainen',
      name: 'Matti Meikäläinen',
      password: 'supersalainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterInsert = await helper.usersInDb()
    expect(usersAfterInsert).toHaveLength(usersInitially.length + 1)

    const usernames = usersAfterInsert.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })
  test('makes sure usernames are unique', async () => {
    const usersInitially = await helper.usersInDb()

    const newUser = {
      username: 'root',
      password: 'supersalainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterInsert = await helper.usersInDb()
    expect(usersAfterInsert).toHaveLength(usersInitially.length)
  })
  test('rejects users without username', async () => {
    const usersInitially = await helper.usersInDb()

    const newUser = {
      name: 'Matti Meikäläinen',
      password: 'supersalainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterInsert = await helper.usersInDb()
    expect(usersAfterInsert).toHaveLength(usersInitially.length)
  })
  test('rejects users without password', async () => {
    const usersInitially = await helper.usersInDb()

    const newUser = {
      name: 'Matti Meikäläinen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterInsert = await helper.usersInDb()
    expect(usersAfterInsert).toHaveLength(usersInitially.length)
  })
  test('rejects users with password under 3 characters', async () => {
    const usersInitially = await helper.usersInDb()

    const newUser = {
      name: 'Matti Meikäläinen',
      password: 'su'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAfterInsert = await helper.usersInDb()
    expect(usersAfterInsert).toHaveLength(usersInitially.length)
  })
})

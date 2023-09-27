const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('with empty list', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('with single blog entry', () => {
    const result = listHelper.totalLikes(singleBlog)
    expect(result).toBe(7)
  })

  test('with multiple blog entries', () => {
    const result = listHelper.totalLikes(multipleBlogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('with empty list', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('with single blog entry', () => {
    const result = listHelper.favoriteBlog(singleBlog)
    expect(result).toEqual(singleBlog[0])
  })

  test('with multiple blog entries', () => {
    const favoriteBlog = {
      'title': 'Canonical string reduction',
      'author': 'Edsger W. Dijkstra',
      'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      'likes': 12
    }

    const result = listHelper.favoriteBlog(multipleBlogs)
    expect(result).toEqual(favoriteBlog)
  })
})

describe('most blogs', () => {
  test('with empty list', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('with single blog entry', () => {
    const result = listHelper.mostBlogs(singleBlog)
    expect(result).toEqual({
      'author': 'Michael Chan',
      blogs: 1
    })
  })

  test('with multiple blog entries', () => {

    const result = listHelper.mostBlogs(multipleBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('with empty list', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('with single blog entry', () => {
    const result = listHelper.mostLikes(singleBlog)
    expect(result).toEqual({
      'author': 'Michael Chan',
      likes: 7
    })
  })

  test('with multiple blog entries', () => {

    const result = listHelper.mostLikes(multipleBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})

const singleBlog = [
  {
    'title': 'React patterns',
    'author': 'Michael Chan',
    'url': 'https://reactpatterns.com/',
    'likes': 7
  },
]

const multipleBlogs = [
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

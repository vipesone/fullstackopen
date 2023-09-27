const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((previousValue, currentValue) => previousValue + currentValue.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length
    ? blogs.reduce((previousValue, currentValue) => currentValue.likes > previousValue.likes ? currentValue : previousValue)
    : {}
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  let blogsByAuthor = []

  blogs.forEach((blogItem) => {
    const index = blogsByAuthor.findIndex((element) => element.author === blogItem.author)

    if (index !== -1) {
      blogsByAuthor[index].blogs += 1
    } else {
      blogsByAuthor.push({
        author: blogItem.author,
        blogs: 1
      })
    }
  })

  return blogsByAuthor.reduce((previousValue, currentValue) => currentValue.blogs > previousValue.blogs ? currentValue : previousValue)
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  let blogsByAuthor = []

  blogs.forEach((blogItem) => {
    const index = blogsByAuthor.findIndex((element) => element.author === blogItem.author)

    if (index !== -1) {
      blogsByAuthor[index].likes += blogItem.likes
    } else {
      blogsByAuthor.push({
        author: blogItem.author,
        likes: blogItem.likes
      })
    }
  })

  return blogsByAuthor.reduce((previousValue, currentValue) => currentValue.likes > previousValue.likes ? currentValue : previousValue)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

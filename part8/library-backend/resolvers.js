const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Author: {
    bookCount: (root) => {
      return Book.collection.countDocuments({ author: root._id })
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('You are not authorized, try logging in first.')
      }

      let authorId = null

      const authorDocument = await Author.findOne({ name: args.author })

      if (authorDocument && authorDocument._id) {
        authorId = authorDocument._id
      } else {
        try {
          const newAuthor = new Author({ name: args.author })

          const addedAuthor = await newAuthor.save()

          authorId = addedAuthor._id
        } catch(error) {
          throw new GraphQLError('Could not save author information, please check input.', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }

      const book = new Book({ ...args, author: authorId })

      try {
        await book.save().then((savedBook) => savedBook.populate('author'))
      } catch(error) {
        throw new GraphQLError('Could not save author information, please check input.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return book
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save()
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('You are not authorized, try logging in first.')
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch(error) {
        throw new GraphQLError('Could not update author born year, please check input.', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error
          }
        })
      }

      return author
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Incorrect credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userInformation = {
        username: user.username,
        id: user._id
      }

      return {
        token: jwt.sign(userInformation, process.env.SECRET),
        favoriteGenre: user.favoriteGenre
      }
    }
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let conditions = {}

      if (args.genre) {
        conditions = {
          'genres': args.genre
        }
      }

      if (args.author) {
        const authorDocument = await Author.findOne({ name: args.author })

        if (authorDocument && authorDocument._id) {
          conditions.author = authorDocument._id
        } else {
          return []
        }
      }

      return Book.find(conditions).populate('author')
    },
    allAuthors: async() => {
      return Author.find({})
    },
    allGenres: async (root, args) => {
      let genres = []
      const books = await Book.find({})

      books.map((book) => {
        if (book.genres) {
          genres = genres.concat(book.genres)
        }
      })

      genres.push('all genres')

      const uniqueGenres = [...new Set(genres)]

      return uniqueGenres
    },
    me: (root, args, context) => {
      console.log(context)
      return context.currentUser
    }
  }
}

module.exports = resolvers

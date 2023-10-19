const jwt = require('jsonwebtoken')

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    login(
      username: String!
      password: String!
    ): LoginResponse
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    allGenres: [String]
    me: User
  }

  type LoginResponse {
    token: String!
    favoriteGenre: String
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
`

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.startsWith('Bearer ')) {
      const token = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findById(token.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

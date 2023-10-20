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

module.exports = typeDefs

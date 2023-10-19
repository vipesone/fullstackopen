import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_GENRES} from "../queries"

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)

  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: { genre },
    fetchPolicy: 'cache-and-network'
  })

  const genreQuery = useQuery(ALL_GENRES)

  if (!show) {
    return null
  }

  if (loading || genreQuery.loading) {
    return <div>Loading...</div>
  }

  const books = data.allBooks

  const genres = genreQuery.data.allGenres

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <strong>{genre}</strong>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre === 'all genres' ? null : genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books

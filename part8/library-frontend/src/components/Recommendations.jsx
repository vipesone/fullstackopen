import { useQuery } from "@apollo/client"
import { ALL_BOOKS} from "../queries"

const Recommendations = ({ show, genre }) => {
  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: { genre }
  })

  if (!show) {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const books = data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favourite genre <strong>{genre}</strong>
      </p>
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
    </div>
  )
}

export default Recommendations

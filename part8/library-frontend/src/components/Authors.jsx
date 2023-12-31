import EditAuthor from "./EditAuthor"

const Authors = ({ authorsQuery, setError, show, showForm }) => {
  if (!show || !authorsQuery) {
    return null
  }

  if (authorsQuery.loading) {
    return <div>Loading...</div>
  }
  const authors = authorsQuery.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && <EditAuthor authors={authors} setError={setError} />}
    </div>
  )
}

export default Authors

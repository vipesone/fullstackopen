import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, UPDATE_AUTHOR_BORN } from '../queries'

const EditAuthor = ({ authors, setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthorBorn] = useMutation(UPDATE_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    updateAuthorBorn({
      variables: {
        name,
        born: born.length ? Number.parseInt(born, 10) : undefined
      }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Edit author birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value="" onChange={({ target }) => setName(target.value)}>
            <option value="">Choose an author</option>
            {authors.map((author) => {
              return <option key={author.id} value={author.name}>{author.name}</option>
            })}
          </select>
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor

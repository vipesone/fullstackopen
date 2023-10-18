import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'

import { useQuery } from '@apollo/client'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')

  const [errorMessage, setErrorMessage] = useState(null)

   const notify = (message) => {
     setErrorMessage(message)
     setTimeout(() => {
       setErrorMessage(null)
     }, 3000)
   }

  const authorsQuery = useQuery(ALL_AUTHORS)
  const booksQuery = useQuery(ALL_BOOKS)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} authorsQuery={authorsQuery} setError={notify} />

      <Books show={page === 'books'} booksQuery={booksQuery} />

      <NewBook show={page === 'add'} setError={notify} />
    </div>
  )
}

export default App

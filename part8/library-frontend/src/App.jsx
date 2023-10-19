import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

import { useApolloClient, useQuery } from '@apollo/client'

import { ALL_AUTHORS } from './queries'

const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('library-token'))
  const [page, setPage] = useState('books')

  const [errorMessage, setErrorMessage] = useState(null)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const authorsQuery = useQuery(ALL_AUTHORS)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} authorsQuery={authorsQuery} setError={notify} showForm={token ? true : false} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify} />

      <LoginForm show={page == 'login'} setToken={setToken} setError={notify} setPage={setPage} />
    </div>
  )
}

export default App

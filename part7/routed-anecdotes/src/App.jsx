import { useState } from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Notification from './components/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notificationStatus, setNotificationStatus] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

  // Set up dissappearing notification.
  const addTemporaryNotification = (message, status) => {
    setNotificationMessage(message)
    setNotificationStatus(status)

    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationStatus(null)
    }, 5000)
  }

  const navigate = useNavigate()
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
  }

  const anecdoteById = (id) => {
    anecdotes.find(a => a.id === id)
  }

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notificationMessage={notificationMessage} notificationStatus={notificationStatus} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<AnecdoteForm addNew={addNew} notify={addTemporaryNotification} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

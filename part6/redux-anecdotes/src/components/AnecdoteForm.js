import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnacdote = async (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`${anecdote} was added`))
  }

  return <div>
    <h2>create new</h2>
    <form onSubmit={addAnacdote}>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
  </div>
}

export default AnecdoteForm

import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnacdote = (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(anecdote))
    dispatch(notificationChange(`${anecdote} was added`))

    setTimeout(() => {
      dispatch(notificationRemove())
    }, 5000)
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

import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnacdote = async (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.createNew(anecdote)

    dispatch(createAnecdote(newAnecdote))
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

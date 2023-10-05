import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!anecdotes) {
      return []
    }
    if (!filter || filter === '') {
      return anecdotes
    } else {
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    }
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.find(item => item.id === id)

    dispatch(voteAnecdote(anecdote))

    dispatch(setNotification(`${anecdote.content} was voted`), 10)
  }

  const sortAnecdotes = (anecdotes) => {
    return [...anecdotes].sort((a, b) => b.votes - a.votes)
  }

  return sortAnecdotes(anecdotes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
}

export default AnecdoteList

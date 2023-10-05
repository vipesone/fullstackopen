import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

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
    dispatch(voteAnecdote(id))

    const anecdote = anecdotes.find(item => item.id === id)

    dispatch(notificationChange(`${anecdote.content} was voted`))

    setTimeout(() => {
      dispatch(notificationRemove())
    }, 5000)
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

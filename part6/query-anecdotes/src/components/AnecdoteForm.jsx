import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"

const AnecdoteForm = ({ notificationDispatch }) => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        notificationDispatch({
          type: 'SET',
          payload: `${newAnecdote.content} added`
        })

        setTimeout(() => {
          notificationDispatch({
            type: 'RESET',
          })
        }, 5000)
    },
    onError: () => {
      notificationDispatch({
        type: 'SET',
        payload: 'There was an error adding anecdote. Most likely it\'s shorter than required 5 characters.'
      })

      setTimeout(() => {
        notificationDispatch({
          type: 'RESET',
        })
      }, 5000)
    }
  })
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return axios
    .get(baseUrl)
    .then(result => result.data)
}

export const createAnecdote = newAnecdote => {
  return axios
    .post(baseUrl, newAnecdote)
    .then(result => result.data)
}

export const updateAnecdote = updatedAnecdote => {
  return axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then(result => result.data)
}

import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const targetAnecdote = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = {
        ...targetAnecdote,
        votes: targetAnecdote.votes + 1
      }

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {
  appendAnecdote,
  createAnecdote,
  setAnecdotes,
  voteAnecdote
} = anecdoteSlice.actions

export default anecdoteSlice.reducer

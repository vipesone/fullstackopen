import { createSlice } from '@reduxjs/toolkit'

const defaultState = null

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: defaultState,
  reducers: {
    updateCurrentUser(state, action) {
      return action.payload
    },
    resetCurrentUser(state, action) {
      return defaultState
    }
  }
})

export const { updateCurrentUser, resetCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer

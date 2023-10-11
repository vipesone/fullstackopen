import { createSlice } from '@reduxjs/toolkit'

const defaultState = null

const userSlice = createSlice({
  name: 'user',
  initialState: defaultState,
  reducers: {
    updateUser(state, action) {
      return action.payload
    },
    resetUser(state, action) {
      return defaultState
    }
  }
})

export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer

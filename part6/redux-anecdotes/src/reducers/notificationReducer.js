import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Anecdotes are cool!',
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    notificationRemove(state, action) {
      return ''
    }
  }
})

export const { notificationChange, notificationRemove } = notificationSlice.actions
export default notificationSlice.reducer

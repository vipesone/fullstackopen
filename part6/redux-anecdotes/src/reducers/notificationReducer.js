import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    notificationRemove(state, action) {
      return ''
    },
  }
})

export const setNotification = (message, visibleSeconds = 5) => {
  return async dispatch => {
    dispatch(notificationChange(message))

    setTimeout(() => {
      dispatch(notificationRemove())
    }, visibleSeconds * 1000)
  }
}

export const { notificationChange, notificationRemove } = notificationSlice.actions
export default notificationSlice.reducer

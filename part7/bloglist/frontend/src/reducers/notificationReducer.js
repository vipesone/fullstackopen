import { createSlice } from '@reduxjs/toolkit'

const defaultState = {
  message: null,
  status: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: defaultState,
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return defaultState
    }
  }
})

export const setNotification = (message, status, visibleSeconds = 5) => {
  return (dispatch) => {
    dispatch(
      notificationChange({
        message: message,
        status: status
      })
    )

    setTimeout(() => {
      dispatch(resetNotification())
    }, visibleSeconds * 1000)
  }
}

export const { notificationChange, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer

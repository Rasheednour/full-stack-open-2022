import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
      setNotification(state, action) {
          return state = action.payload
      },
      removeNotification(state, action) {
        return state = initialState
      }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const sendNotification = (message, duration) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration*1000)
  }
}
export default notificationSlice.reducer
import { createSlice } from "@reduxjs/toolkit"

const initialState = 'you voted...'


const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
      setNotification(state, action) {
          return state = action.payload
      }
  }
})

export const {setNotification} = notificationSlice.actions
export default notificationSlice.reducer
import { createSlice } from "@reduxjs/toolkit"



const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice ({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToUpdate = state.find((anecdote) => anecdote.id === id)
      anecdoteToUpdate.votes += 1
      return state.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return state = action.payload
    }
  }
})

export const {createAnecdote, addVote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
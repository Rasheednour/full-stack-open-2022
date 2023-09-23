import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const anecdoteSlice = createSlice ({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
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

export const { appendAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    await anecdoteService.update(anecdote)
    dispatch(addVote(anecdote.id))
  }
}
export default anecdoteSlice.reducer
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, remo, removeNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (!state.filter) {
            return state.anecdotes
        } else {
            return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
        }
    })
    const vote = (id, content) => {
        dispatch(addVote(id))
        dispatch(setNotification(`You voted '${content}'`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
      }

    return (
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList
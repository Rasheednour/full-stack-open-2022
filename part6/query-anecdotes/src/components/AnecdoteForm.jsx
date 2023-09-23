import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from "react"
import NotificationContext from "../notificationContext"
const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      dispatch({type: 'SHOW', payload: 'too short anecdote, must have length 5 or more'})
    setTimeout(() => {
      dispatch({type: 'HIDE'})
    }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
    dispatch({type: 'SHOW', payload: `created anecdote '${content}'`})
    setTimeout(() => {
      dispatch({type: 'HIDE'})
    }, 5000);
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

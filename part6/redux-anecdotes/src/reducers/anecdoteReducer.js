const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_VOTE': {
      const id = action.payload.id
      const updateAnecdote = state.find((anecdote) => anecdote.id === id)
      const newAnecdote = {...updateAnecdote, votes: updateAnecdote.votes + 1}
      const newState = state.map((anecdote) => anecdote.id === id ? newAnecdote: anecdote);
      return newState.sort((a, b) => b.votes - a.votes)
    }
    case 'NEW_ANECDOTE': {
      const content = action.payload.content
      const anecdote = {content: content, id: getId(), votes: 0}
      return state.concat(anecdote);
    }
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const newVote = (id) => {
  return {
    type: 'NEW_VOTE',
    payload: { id }
  }
}

export default anecdoteReducer
  
  const initialState = ''
  
  const filterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FILTER': {
        return action.payload.content
      }
      default:
        return state
    }
  }
  
  export const setFilter = (content) => {
    return {
      type: 'FILTER',
      payload: {
        content,
      }
    }
  }
  
  export default filterReducer
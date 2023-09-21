import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
const Filter = () => {
    const filterValue = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const handleChange = (event) => {

      // input-field value is in variable event.target.value
      
      const searchValue = event.target.value 
      dispatch(setFilter(searchValue))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input value={filterValue} onChange={handleChange} />
      </div>
    )
  }
  
export default Filter
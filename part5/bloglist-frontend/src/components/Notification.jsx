import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={message.type === 'success' ? 'success' : 'error'}>
      {message.text}
    </div>
  )
}

export default Notification

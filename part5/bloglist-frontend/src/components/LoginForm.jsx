import React from 'react'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
        </div>
        <div>
            password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id='password'
          />
        </div>
        <button type="submit" id='login-button'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
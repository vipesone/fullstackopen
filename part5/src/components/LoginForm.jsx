// Provide login form.
const LoginForm = ({handleLogin, username, password, setUsername, setPassword}) => {
  return <form onSubmit={handleLogin}>
    <div>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)} />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="text"
        value={password}
        onChange={({ target }) => setPassword(target.value)} />
    </div>
    <button type="submit">Login</button>
  </form>
}

export default LoginForm

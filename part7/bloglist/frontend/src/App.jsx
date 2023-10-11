import { useState, useEffect, useRef } from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import Notification from './components/Notification'
import Menu from './components/Menu'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { updateUser, resetUser } from './reducers/userReducer'

import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('blogUser')

    if (userJSON) {
      const parsedUser = JSON.parse(userJSON)

      dispatch(updateUser(parsedUser))
      blogService.setToken(parsedUser.token)
    }
  }, [dispatch])

  // Handle login through backend.
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('blogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(updateUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Invalid credentials', 'error'))
    }
  }

  // Clears out currently logged in user.
  const handleLogoutClick = () => {
    window.localStorage.removeItem('blogUser')
    dispatch(resetUser())
    blogService.setToken('')
  }

  const blogMatch = useMatch('/blogs/:id')
  const singleBlog = blogMatch
    ? blogs.find((blog) => blog.id === Number(blogMatch.params.id))
    : null

  return (
    <div>
      <Menu logout={handleLogoutClick} user={user} />
      <h1>Blogs</h1>
      <Notification />

      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}

      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} user={user} />} />
      </Routes>
    </div>
  )
}

export default App

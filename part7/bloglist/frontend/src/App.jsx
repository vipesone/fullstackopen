import { useState, useEffect, useRef } from 'react'
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import Notification from './components/Notification'
import Menu from './components/Menu'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { updateCurrentUser, resetCurrentUser } from './reducers/currentUserReducer'

import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'

import BlogDetails from './components/BlogDetails'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const authors = useSelector((state) => state.author)

  const currentUser = useSelector((state) => state.currentUser)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('blogUser')

    if (userJSON) {
      const parsedUser = JSON.parse(userJSON)

      dispatch(updateCurrentUser(parsedUser))
      blogService.setToken(parsedUser.token)
    }
  }, [dispatch])

  // Handle login through backend.
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const currentUser = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('blogUser', JSON.stringify(currentUser))

      blogService.setToken(currentUser.token)
      dispatch(updateCurrentUser(currentUser))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Invalid credentials', 'error'))
    }
  }

  // Clears out currently logged in user.
  const handleLogoutClick = () => {
    window.localStorage.removeItem('blogUser')
    dispatch(resetCurrentUser())
    blogService.setToken('')
  }

  const blogMatch = useMatch('/blogs/:id')
  const singleBlog = blogMatch ? blogs.find((blog) => blog.id === blogMatch.params.id) : null

  const userMatch = useMatch('/users/:id')

  return (
    <div>
      <Menu logout={handleLogoutClick} currentUser={currentUser} />
      <h1>Blogs</h1>
      <Notification />

      {!currentUser && (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}

      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} currentUser={currentUser} />} />
        <Route path="/blogs/:id" element={<BlogDetails blog={singleBlog} currentUser={currentUser} />} />
      </Routes>
    </div>
  )
}

export default App

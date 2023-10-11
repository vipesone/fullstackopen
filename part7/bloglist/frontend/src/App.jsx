import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { createBlog, deleteBlog, initializeBlogs, likeBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { updateUser, resetUser } from './reducers/userReducer'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

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

  // Handle submit for blog addition form.
  const addBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`${newBlog.title} by ${newBlog.author} was added`, 'notification'))
      blogFormRef.current.toggle()
    } catch (exception) {
      const message = exception.response.data.error
        ? exception.response.data.error
        : 'Unknown error occurred while adding blog'

      dispatch(setNotification(message, 'error'))
    }
  }

  // Handle like button for single blog item.
  const handleLikeBlog = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`${blog.title} by ${blog.author} was liked`, 'notification'))
    } catch (exception) {
      dispatch(setNotification('Unknown error while liking blog', 'error'))
    }
  }

  // Handle removing single blog item.
  const removeBlog = async (blogToRemove) => {
    try {
      if (confirm(`Are you sure you want to remove ${blogToRemove.title}?`)) {
        const message = `${blogToRemove.title} by ${blogToRemove.author} was removed`
        dispatch(deleteBlog(blogToRemove.id))
        dispatch(setNotification(message, 'notification'))
      }
    } catch (exception) {
      dispatch(setNotification('Unknown error while removing blog', 'error'))
    }
  }

  // Returns sorted list of blogs as a copy.
  const sortByLikes = (blogs) => {
    return [...blogs].sort((a, b) => {
      return b.likes - a.likes
    })
  }

  // Clears out currently logged in user.
  const handleLogoutClick = () => {
    window.localStorage.removeItem('blogUser')
    dispatch(resetUser())
    blogService.setToken('')
  }

  return (
    <div>
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
      {user && (
        <div>
          <p>
            {user.name} is logged in <button onClick={handleLogoutClick}>logout</button>
          </p>

          <h2>Add new blog item</h2>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>

          {sortByLikes(blogs).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={handleLikeBlog}
              removeBlog={removeBlog}
              isOwner={blog.user && user.username === blog.user.username}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App

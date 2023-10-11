import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('blogUser')

    if (userJSON) {
      const parsedUser = JSON.parse(userJSON)

      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  // Set up dissappearing notification.
  const addTemporaryNotification = (message, status) => {
    setNotificationMessage(message)
    setNotificationStatus(status)

    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationStatus(null)
    }, 3000)
  }

  // Handle login through backend.
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'blogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      addTemporaryNotification('Invalid credentials', 'error')
    }
  }

  // Handle submit for blog addition form.
  const addBlog = async (newBlog) => {
    try {
      const response = await blogService.create(newBlog)

      const addedItem = {
        ...response,
        user: {
          id: user.id,
          name: user.name,
          username: user.username
        }
      }

      setBlogs(blogs.concat(addedItem))
      addTemporaryNotification(
        `${response.title} by ${response.author} was added`,
        'notification'
      )
      blogFormRef.current.toggle()
    } catch (exception) {
      const message = exception.response.data.error
        ? exception.response.data.error
        : 'Unknown error occurred while adding blog'

      addTemporaryNotification(
        message,
        'error'
      )
    }
  }

  // Handle like button for single blog item.
  const likeBlog = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }

      const response = await blogService.update(updatedBlog.id, updatedBlog)

      const updatedBlogItems = blogs.map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog)

      setBlogs(updatedBlogItems)
      addTemporaryNotification(
        `${response.title} by ${response.author} was liked`,
        'notification'
      )
    } catch (exception) {
      addTemporaryNotification(
        'Unknown error while liking blog',
        'error'
      )
    }
  }

  // Handle removing single blog item.
  const removeBlog = async (blogToRemove) => {
    try {
      if (confirm(`Are you sure you want to remove ${blogToRemove.title}?`)) {
        await blogService.remove(blogToRemove.id)

        const updatedBlogItems = blogs.filter((blog) => blog.id !== blogToRemove.id)

        setBlogs(updatedBlogItems)
        addTemporaryNotification(
          `${blogToRemove.title} by ${blogToRemove.author} was removed`,
          'notification'
        )
      }
    } catch (exception) {
      addTemporaryNotification(
        'Unknown error while removing blog',
        'error'
      )
    }
  }

  // Returns sorted list of blogs as a copy.
  const sortByLikes = blogs => {
    return [...blogs].sort((a, b) => {
      return b.likes - a.likes
    })
  }

  // Clears out currently logged in user.
  const handleLogoutClick = () => {
    window.localStorage.removeItem('blogUser')
    setUser(null)
    blogService.setToken('')
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} status={notificationStatus} />

      { !user && <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword} />}
      { user && <div>
        <p>{user.name} is logged in <button onClick={handleLogoutClick}>logout</button></p>

        <h2>Add new blog item</h2>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm
            addBlog={addBlog}
          />
        </Togglable>

        {sortByLikes(blogs).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            isOwner={blog.user && (user.username === blog.user.username)} />
        )}
      </div>
      }
    </div>
  )
}

export default App

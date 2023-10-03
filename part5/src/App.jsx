import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(null);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    const blogs = blogService.getAll().then(blogs =>
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
  const handleBlogSubmitClick = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.create({
        title: blogTitle, author: blogAuthor, url: blogUrl
      })

      setBlogs(blogs.concat(response))
      addTemporaryNotification(
        `${response.title} by ${response.author} was added`,
        'notification'
      )
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
        <BlogForm
          handleBlogTitleChange={({target}) => setBlogTitle(target.value)}
          handleBlogAuthorChange={({ target }) => setBlogAuthor(target.value)}
          handleBlogUrlChange={({ target }) => setBlogUrl(target.value)}
          handleBlogSubmitClick={handleBlogSubmitClick}
        />

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div>
      }
    </div>
  )
}

export default App
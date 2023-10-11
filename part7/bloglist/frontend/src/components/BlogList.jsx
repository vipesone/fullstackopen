import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { createBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = ({ blogs, user }) => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

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

  // Returns sorted list of blogs as a copy.
  const sortByLikes = (blogs) => {
    return [...blogs].sort((a, b) => {
      return b.likes - a.likes
    })
  }

  if (!user) {
    return null
  } else {
    return (
      <div>
        <h2>Add new blog item</h2>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>

        {sortByLikes(blogs).map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }
}

export default BlogList

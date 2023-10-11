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

  // Handle like button for single blog item.
  const handleLikeBlog = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`${blog.title} by ${blog.author} was liked`, 'notification'))
    } catch (exception) {
      dispatch(setNotification('Unknown error while liking blog', 'error'))
    }
  }

  // Returns sorted list of blogs as a copy.
  const sortByLikes = (blogs) => {
    return [...blogs].sort((a, b) => {
      return b.likes - a.likes
    })
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
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={handleLikeBlog}
            removeBlog={removeBlog}
            isOwner={blog.user && user.username === blog.user.username}
          />
        ))}
      </div>
    )
  }
}

export default BlogList

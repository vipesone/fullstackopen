import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogDetails = ({ blog, user }) => {
  const dispatch = useDispatch()

  if (!blog) {
    return null
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

  const isOwner = blog.user && user.username === blog.user.username

  return (
    <div className="blog-details">
      <h2>
        <span className="blog-item__title">{blog.title}</span> {blog.author}
      </h2>
      <div className="blog-item__details">
        <a href={blog.url}>{blog.url}</a>
        <div>
          Likes: <span className="like-count">{blog.likes}</span>{' '}
          <button className="like-button" onClick={() => handleLikeBlog(blog)}>
            like
          </button>
        </div>
        {blog.user && <div> Added by {blog.user.name}</div>}
        {isOwner && (
          <button className="remove-button" onClick={() => removeBlog(blog)}>
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default BlogDetails

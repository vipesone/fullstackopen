import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createComment, deleteBlog, likeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

const BlogDetails = ({ blog, currentUser }) => {
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  // Handle submit for blog addition form.
  const addComment = async (blog, newCommment) => {
    try {
      dispatch(createComment(blog, newCommment))
      dispatch(setNotification(`${newCommment.content} was added`, 'notification'))
    } catch (exception) {
      const message = exception.response.data.error
        ? exception.response.data.error
        : 'Unknown error occurred while adding comment'

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

  const isOwner = blog.user && currentUser.username === blog.user.username

  return (
    <div className="blog-details">
      <h2>
        <span className="blog-item__title">{blog.title}</span> {blog.author}
      </h2>
      <div className="blog-item__details">
        <a href={blog.url}>{blog.url}</a>
        <div>
          Likes: <span className="like-count">{blog.likes}</span>{' '}
          <button className="bg-white hover:bg-amber-500 text-indigo-900 border-2 border-indigo-900 hover:border-amber-500 font-semibold hover:text-white py-1 px-4" onClick={() => handleLikeBlog(blog)}>
            like
          </button>
        </div>
        {blog.user && <div> Added by {blog.user.name}</div>}
        {isOwner && (
          <button className="bg-white hover:bg-amber-500 text-indigo-900 border-2 border-indigo-900 hover:border-amber-500 font-semibold hover:text-white py-1 px-4" onClick={() => removeBlog(blog)}>
            Remove
          </button>
        )}
      </div>
      <div className="blog-item__comments">
        <h2>Comments</h2>
        <CommentForm addComment={addComment} blog={blog} />
        {blog.comments && <ul>
          {blog.comments.map((comment) => <li key={comment.id}>{comment.content}</li>)}
        </ul>}
      </div>
    </div>
  )
}

export default BlogDetails

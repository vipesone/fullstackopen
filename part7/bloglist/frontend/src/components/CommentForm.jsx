import { useState } from 'react'
import PropTypes from 'prop-types'

const CommentForm = ({ addComment, blog }) => {
  const [content, setContent] = useState('')

  const createNewComment = (event) => {
    event.preventDefault()
    addComment(blog, {
      content: content
    })
  }

  return (
    <>
      <form onSubmit={createNewComment} id="comment-form">
        <div>
          <label htmlFor="comment-content">Your comment:</label>
          <input id="comment-conent" onChange={({ target }) => setContent(target.value)} />
        </div>
        <div>
          <button type="submit" id="comment-submit">
            add
          </button>
        </div>
      </form>
    </>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
}

export default CommentForm

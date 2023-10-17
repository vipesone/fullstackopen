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
          <input id="comment-conent" onChange={({ target }) => setContent(target.value)} className="border-2 border-indigo-900 py-1 px-4 ml-2" />
        </div>
        <div>
          <button type="submit" id="comment-submit" className="bg-white hover:bg-amber-500 text-indigo-900 border-2 border-indigo-900 hover:border-amber-500 font-semibold hover:text-white py-1 px-4">
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

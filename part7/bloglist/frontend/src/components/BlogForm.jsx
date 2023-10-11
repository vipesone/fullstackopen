import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })
  }

  return (
    <>
      <form onSubmit={createNewBlog} id="blog-form">
        <div>
          <label htmlFor="blog-title">Blog title:</label>
          <input id="blog-title" onChange={({ target }) => setBlogTitle(target.value)} />
        </div>
        <div>
          <label htmlFor="blog-author">Blog author:</label>
          <input id="blog-author" onChange={({ target }) => setBlogAuthor(target.value)} />
        </div>
        <div>
          <label htmlFor="blog-url">Blog URL:</label>
          <input id="blog-url" onChange={({ target }) => setBlogUrl(target.value)} />
        </div>
        <div>
          <button type="submit" id="blog-submit">
            add
          </button>
        </div>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm

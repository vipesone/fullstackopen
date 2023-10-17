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
        <div className="py-1">
          <label htmlFor="blog-title">Blog title:</label>
          <input id="blog-title" onChange={({ target }) => setBlogTitle(target.value)} className="border-2 border-indigo-900 py-1 px-4 ml-2" />
        </div>
        <div className="py-1">
          <label htmlFor="blog-author">Blog author:</label>
          <input id="blog-author" onChange={({ target }) => setBlogAuthor(target.value)} className="border-2 border-indigo-900 py-1 px-4 ml-2" />
        </div>
        <div className="py-1">
          <label htmlFor="blog-url">Blog URL:</label>
          <input id="blog-url" onChange={({ target }) => setBlogUrl(target.value)} className="border-2 border-indigo-900 py-1 px-4 ml-2" />
        </div>
        <div className="py-1">
          <button type="submit" id="blog-submit" className="bg-white hover:bg-amber-500 text-indigo-900 border-2 border-indigo-900 hover:border-amber-500 font-semibold hover:text-white py-1 px-4">
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

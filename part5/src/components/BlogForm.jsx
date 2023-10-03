import { useState } from 'react'
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
      <form onSubmit={createNewBlog}>
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
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm

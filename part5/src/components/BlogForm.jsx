const BlogForm = ({
  handleBlogTitleChange,
  handleBlogAuthorChange,
  handleBlogUrlChange,
  handleBlogSubmitClick }) => {
  return (
    <>
      <form>
        <div>
          <label htmlFor="blog-title">Blog title:</label>
          <input id="blog-title" onChange={handleBlogTitleChange} />
        </div>
        <div>
          <label htmlFor="blog-author">Blog author:</label>
          <input id="blog-author" onChange={handleBlogAuthorChange} />
        </div>
        <div>
          <label htmlFor="blog-url">Blog URL:</label>
          <input id="blog-url" onChange={handleBlogUrlChange} />
        </div>
        <div>
          <button type="submit" onClick={handleBlogSubmitClick}>add</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm

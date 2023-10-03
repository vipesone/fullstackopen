import { useState } from "react"

const Blog = ({ blog, likeBlog, removeBlog, isOwner }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  return (
    <div className="blog-item">
      <div>{blog.title} {blog.author}
      <button onClick={() => setDetailsVisible(!detailsVisible)}>
        {detailsVisible ? 'hide' : 'show'}
      </button>
      </div>
      <div style={detailsVisible ? {} : {display: 'none'}} className="blog-item__details">
        <div>{blog.url}</div>
        <div>Likes: {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        {isOwner && <button onClick={() => removeBlog(blog)}>Remove</button>}
      </div>
    </div>
  )
}

export default Blog

import { Link } from 'react-router-dom'

const Blog = ({ blog, likeBlog, removeBlog, isOwner }) => {
  return (
    <div className="blog-item">
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  )
}

export default Blog


const UserDetails = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div className="user-details">
      <h2>
        <span className="user-item__title">{user.username}</span>
      </h2>
      {/* <div className="blog-item__details">
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
      </div> */}
    </div>
  )
}

export default UserDetails


const UserDetails = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div className="user-details">
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      {!user.blogs && <strong>No blog posts found.</strong>}
      {user.blogs && <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>}
    </div>
  )
}

export default UserDetails

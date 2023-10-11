import { Link } from 'react-router-dom'
const Menu = ({ logout, user }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>
        Blogs
      </Link>
      <Link to="/users" style={padding}>
        Users
      </Link>
      {user && (
        <span>
          {user.name} is logged in <button onClick={logout}>logout</button>
        </span>
      )}
    </div>
  )
}

export default Menu

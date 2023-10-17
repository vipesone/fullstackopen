import { Link } from 'react-router-dom'
const Menu = ({ logout, currentUser }) => {
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
      {currentUser && (
        <span>
          {currentUser.name} is logged in <button onClick={logout}>logout</button>
        </span>
      )}
    </div>
  )
}

export default Menu

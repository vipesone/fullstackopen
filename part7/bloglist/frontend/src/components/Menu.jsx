import { Link } from 'react-router-dom'
const Menu = ({ logout, currentUser }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div className="container mx-auto">
      <div className="flex gap-2 items-center">
        <Link to="/" style={padding}>
          Blogs
        </Link>
        <Link to="/users" style={padding}>
          Users
        </Link>
        {currentUser && (
          <span className="ml-auto">
            {currentUser.name} is logged in <button onClick={logout} className="bg-white hover:bg-amber-500 text-indigo-900 font-semibold rounded hover:text-white py-1 px-4">logout</button>
          </span>
        )}
      </div>
    </div>
  )
}

export default Menu

import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  if(!users) {
    return null
  }
  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => {
            return <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserList

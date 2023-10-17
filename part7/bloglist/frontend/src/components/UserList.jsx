const UserList = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr><th></th><th>blogs created</th></tr>
        {users.map((user) => {
          return <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs ? user.blogs.length : 0}</td>
          </tr>
        })}
      </table>
    </div>
  )
}

export default UserList

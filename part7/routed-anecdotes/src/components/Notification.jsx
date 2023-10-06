const Notification = ({ notificationMessage, notificationStatus }) => {
  const style = {
    border: 'dotted',
    padding: 10,
    borderWidth: 2,
    marginBottom: 5,
    marginTop: 10,
    borderColor: notificationStatus === 'error' ? 'red' : 'green'
  }

  if (!notificationMessage) return null

  return (
    <div style={style}>
      {notificationMessage}
    </div>
  )
}

export default Notification

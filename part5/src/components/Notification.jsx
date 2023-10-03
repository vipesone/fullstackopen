const Notification = ({ message, status }) => {
  if (message === null || message === '') {
    return null
  }

  return (
    <div className={status == 'error' ? 'notification error': 'notification'}>
      {message}
    </div>
  )
}

export default Notification

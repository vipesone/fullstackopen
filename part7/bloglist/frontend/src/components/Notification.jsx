import { useSelector } from 'react-redux'
const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const status = useSelector((state) => state.notification.status)

  if (message === null || message === '') {
    return null
  }

  return <div className={status === 'error' ? 'notification error' : 'notification'}>{message}</div>
}

export default Notification

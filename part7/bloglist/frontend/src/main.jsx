import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import './index.css'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import currentUserReducer from './reducers/currentUserReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    currentUser: currentUserReducer,
    notification: notificationReducer,
    users: userReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)

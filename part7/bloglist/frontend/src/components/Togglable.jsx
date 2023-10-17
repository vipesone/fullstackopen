import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [toggled, setToggled] = useState(false)

  const hideWhenToggled = { display: toggled ? 'none' : '' }
  const hideWhenUntoggled = { display: toggled ? '' : 'none' }

  const toggle = () => {
    setToggled(!toggled)
  }

  useImperativeHandle(ref, () => {
    return {
      toggle
    }
  })

  return (
    <div>
      <div style={hideWhenToggled}>
        <button onClick={toggle} className="bg-white hover:bg-amber-500 text-indigo-900 border-2 border-indigo-900 hover:border-amber-500 font-semibold hover:text-white py-1 px-4">{props.buttonLabel}</button>
      </div>
      <div style={hideWhenUntoggled} className="togglable-content">
        {props.children}
        <button onClick={toggle} className="bg-white hover:bg-amber-500 text-red-700 border-2 border-red-700 hover:border-amber-500 font-semibold hover:text-white py-1 px-4">cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable

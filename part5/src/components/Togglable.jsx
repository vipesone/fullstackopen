import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [toggled, setToggled] = useState(false)

  const hideWhenToggled = { display: (toggled ? 'none' : '') }
  const hideWhenUntoggled = { display: (toggled ? '' : 'none') }

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
        <button onClick={toggle}>{props.buttonLabel}</button>
      </div>
      <div style={hideWhenUntoggled} className="togglable-content">
        {props.children}
        <button onClick={toggle}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable

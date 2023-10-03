import { useState, useImperativeHandle, forwardRef } from "react"
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
      <div style={hideWhenUntoggled}>
        {props.children}
        <button onClick={toggle}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable

import PropTypes from 'prop-types'

import { useField } from '../hooks/index'

const AnecdoteForm = ({ addNew, notify }) => {
  const {reset: contentReset, ...content} = useField('text')
  const {reset: authorReset, ...author} = useField('text')
  const {reset: infoReset, ...info} = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()

    addNew({
      content: content.value,
      author: author.value,
      info:info.value,
      votes: 0
    })
    notify(`${content.value} was added`, 'notification')
  }

  const resetFields = (e) => {
    e.preventDefault()

    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={resetFields}>reset</button>
      </form>
    </div>
  )
}

AnecdoteForm.propTypes = {
  addNew: PropTypes.func,
  notify: PropTypes.func
}

export default AnecdoteForm

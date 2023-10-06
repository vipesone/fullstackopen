import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setResources(response.data)
    })
  }, [baseUrl])

  const create = (resource) => {
    console.log(resource)
    axios.post(baseUrl, resource).then(response => {
      setResources(resources.concat(response.data))
    })
  }

  const update = (resource) => {
    axios
      .put(`${baseUrl}/${resource.id}`, resource)
      .then(response => {
        const updatedResource = response.data
        const updatedResources = resources.map((resource) => {
          return resource.id === updatedResource.id ? updatedResource : resource
        })
        setResources(updatedResources)
      })
  }

  const service = {
    create,
    update
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3001/notes')
  const [persons, personService] = useResource('http://localhost:3001/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  const handleVote = (note) => {
    note.votes = (note.votes || 0) + 1
    noteService.update(note)
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(note => {
        return <p key={note.id}>
          {`${note.content} has ${note.votes ? note.votes : 0} votes`}
          <button onClick={() => handleVote(note)}>vote</button>
        </p>
      })}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App

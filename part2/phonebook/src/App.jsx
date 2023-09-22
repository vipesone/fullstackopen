import { useState } from 'react'

import Contact from './components/Contact'
import Filter from './components/Filter'
import Form from './components/Form'

function App() {
  // Variables for filter.
  const [filter, setFilter] = useState('')

  // Variables for form.
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // Set up list of persons.
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  // Handle filtering persons based on user input.
  const visiblePersons = (filter == '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  // Handle adding persons.
  const handleSubmitClick = (event) => {
    event.preventDefault()

    const matchingPersons = persons.filter((person) => person.name == newName)

    if (matchingPersons.length) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      setPersons([...persons, newPerson])
    }
  }

  // Separate simple handlers for all the text fields.
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <Form
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmitClick={handleSubmitClick} />

      <h2>Numbers</h2>
      {visiblePersons.map((person, index) => <Contact key={index} contact={person} />) }
    </div>
  )
}

export default App

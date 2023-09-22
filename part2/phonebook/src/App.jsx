import { useState, useEffect } from 'react'

import Contact from './components/Contact'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Form from './components/Form'

import personService from './services/persons'

function App() {
  // Variables for notifications.
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationStatus, setNotificationStatus] = useState(null);

  // Variables for filter.
  const [filter, setFilter] = useState('')

  // Variables for form.
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // Set up list of persons.
  const [persons, setPersons] = useState([])

  // Fetch phonebook.
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // Handle filtering persons based on user input.
  const visiblePersons = (filter == '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  // Handle adding persons.
  const handleSubmitClick = (event) => {
    event.preventDefault()

    const newPerson = { name: newName, number: newNumber }

    const matchingPersons = persons.filter((person) => person.name == newName)

    const confirmMessage = `${newName} is already added to phonebook, replace the old number with a new one?`
    if (matchingPersons.length) {
      const id = matchingPersons[0].id;
      if (confirm(confirmMessage)) {
        personService
        .update(id, newPerson)
          .then(response => {
            setPersons(persons.map((person) => person.id != id ? person : response.data))
          })
        }
    } else {
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          addTemporaryNotification(
            `${response.data.name} was added`,
            'notification'
          )
        })
    }
  }

  // Set up dissappearing notification.
  const addTemporaryNotification = (message, status) => {
    setNotificationMessage(message)
    setNotificationStatus(status)

    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationStatus(null)
    }, 3000)
  }

  // Handle person removal button click.
  const handleContactRemoval = (id) => {
    const person = persons.find((person) => person.id == id);
    if (window.confirm(`Are you sure you want to remove ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id != id))
          addTemporaryNotification(
            `${person.name} was removed`,
            'notification'
          )
        })
        .catch(error => {
          addTemporaryNotification(`${person.name} has already been removed from the phonebook`, 'error')
        })
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
      <Notification message={notificationMessage} status={notificationStatus} />
      <Filter handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <Form
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmitClick={handleSubmitClick} />

      <h2>Numbers</h2>
      {visiblePersons.map((person, index) =>
        <Contact
          key={index}
          contact={person}
          handleContactClick={() => handleContactRemoval(person.id)} />) }
    </div>
  )
}

export default App

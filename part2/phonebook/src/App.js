import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from "./components/Person"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [wordFilter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) =>{
    event.preventDefault()
    const names = persons.map(person => person.name)

    if(names.includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }else{
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  
  const personsFilter = persons.filter(person => person.name.toLowerCase().indexOf(wordFilter.toLowerCase())>=0)


  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input value={wordFilter} onChange={handleFilterChange} /></div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsFilter.map(person =>
        <Person person={person} key={person.id}/>)}
    </div>
  )
}

export default App
import { useState, useEffect } from 'react'
import Person from "./components/Person"
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [wordFilter, setFilter] = useState('')
  const [actualMessage, setMessage] = useState(null)
  const [actualStyle, setStyle] = useState('container')

  useEffect(() => {
    personService
      .getAll()
      .then(person => {
        setPersons(person)
      })
  }, [])

  const callMessage = (text, style) =>{
    setStyle(style)
    setMessage(
      `${text}`
    )
    setTimeout(() => {
      setMessage(null)
    },2000)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const names = persons.map(person => person.name)

    if(names.includes(newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: newNumber }
        const id = person.id
        personService
        .update(id, changedPerson)
        .then( returnedPerson =>{
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          callMessage(`${person.name} number changed`, 'container')
        }).catch(error =>{
          setStyle('error')
          callMessage(`'${person.name}' was already removed from server`, 'error')
          setPersons(persons.filter(p => p.id !== id ))
        })
      }
      setNewName('')
      setNewNumber('')
    }else{
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons[persons.length-1].id + 1
      }
      personService
      .create(personObject)
      .then(person => {
        setPersons(persons.concat(person)) 
        callMessage(`Added ${person.name}`, 'container')
        setNewName('')
        setNewNumber('')
      })
      
    }

  }

  const deleteNumber = (id, name) =>{
    if(window.confirm(`Delete ${name} ?`) ){
    personService
    .deleteItem(id)
    .then(person => {
      setPersons(persons.filter(p => p.id !== id))
    })}
  } 

  

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  
  const personsFilter =  
  persons.filter(person => 
    person.name
    .toLowerCase()
    .indexOf(
      wordFilter.toLowerCase())>=0
      ) 

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={actualMessage} style={actualStyle}/>
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
        <Person person={person} key={person.id} functionDelete={()=>deleteNumber(person.id, person.name)}/>)}
    </div>
  )
}

export default App
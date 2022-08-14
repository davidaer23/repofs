import { useState, useEffect } from 'react'
import axios from 'axios'
import Countrie from "./components/Countrie"
import ViewCountrie from './components/ViewCountrie'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [wordFilter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)
  
  const countriesFilter = countries.filter(countrie => countrie.name.common.toLowerCase().indexOf(wordFilter.toLowerCase())>=0)
  

  return (
    <div>
      <div>find countries <input value={wordFilter} onChange={handleFilterChange} /></div>
      <h2>Countries</h2>
      {countriesFilter.length===1 ? 
      <ViewCountrie countrie = {countriesFilter[0]}  />:
      countriesFilter.length>10 ?
        <p>Too many matches, specify another filter</p> :
      countriesFilter.map(countrie =>
        <Countrie countrie={countrie} key={countrie.cca2} handle={handleFilterChange}/>
        )}
        
    </div>
  )
}

export default App
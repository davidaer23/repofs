import React from "react";
import {useState,useEffect} from 'react'
import axios from 'axios'
import Temp from "./Temp";

const ViewCountrie = ({countrie}) => {
    const [weatherCapital, setWeather] = useState([])

  useEffect(()=>{
    const api_key = process.env.REACT_APP_API_KEY
    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${countrie.capital}&appid=${api_key}&units=metric`)
    .then(response => {
      setWeather(response.data)
    })
  },[countrie.capital])
    

  return(
    <div>
      <h1>{countrie.name.common}</h1>
      <p>Capital: {countrie.capital} </p>
      <p>Area: {countrie.area}</p>
      <p><b>Languages: </b></p>
      <ul>
        {Object.entries(countrie.languages).map(language => <li key={language[0]}>{language[1]}</li>)}
      </ul>
      <img src={countrie.flags.png} alt="flag"></img>
      <h1>Weather in {countrie.capital}</h1>
      {Object.keys(weatherCapital).length !== 0?
      <Temp weather={weatherCapital} />: <div></div> 
    }
    </div>
  )
}

export default ViewCountrie
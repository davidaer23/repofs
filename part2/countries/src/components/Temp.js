import React from "react";
const Temp = ({weather}) => {
  
    const url="http://openweathermap.org/img/wn/"+weather.weather[0].icon+"@2x.png"
    
    return(
      <div>
      <p>temperature {weather.main.temp} °C</p> 
      <img src={url} alt="icon"></img>
      <p>wind {weather.wind.speed} m/s</p> 
      </div>
    )
}

export default Temp
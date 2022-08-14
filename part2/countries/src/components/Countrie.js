import React from "react";
const Countrie = ({countrie, handle}) => {
    return(
      <div>
      <p> {countrie.name.common} </p>
      <button value={countrie.name.common} key={countrie.cca2} onClick={handle} >show</button>
      </div>
    )
}

export default Countrie
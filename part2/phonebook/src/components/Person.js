import React from "react";

const Person = ({person, functionDelete}) => {
    return(
      <p> {person.name} {person.number} 
        <button onClick={functionDelete}>Delete</button>
      </p>
      
    )
}

export default Person
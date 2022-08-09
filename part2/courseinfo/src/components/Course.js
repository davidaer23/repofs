const Header = ({name}) => {
    return(
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Part = ({name, exercises}) =>{
    return (
      <>
        <p>{name} {exercises}</p>
      </>
    )
  }
  
  
  const Content = ({parts}) => {
    
      return(
        
        parts.map(part =>< Part name={part.name} exercises={part.exercises} key={part.id} />)
      )
    
    
  }
  
  const Total = ({parts}) => {
    return(
      <>
        <p><b>Total of {parts.reduce((total, part) => total += part.exercises , 0)} exercises</b></p>
      </>
    )
  }

const Course = ({course}) => {
return (
    <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>
    )
}

export default Course

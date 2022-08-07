import { useState } from "react"

const Title = (props) => (<h1>{props.text}</h1>)

const StatisticLine = (props) => (<tr><td>{props.text} </td><td> {props.clicks} </td></tr>)

const Button = (props) =>{
  return(
    <button onClick={()=>{props.setClicks(props.clicks + 1)}}>{props.text}</button>
  )
}

const Statistics = (props) => {
  const total=props.good + props.neutral + props.bad
  const average = (props.good-props.bad)/total
  if(total===0){
    return (<p>No feedback given</p>)
  }
  return(
    <div>
      <table>
    <StatisticLine text='good' clicks={props.good} />
      <StatisticLine text='neutral' clicks={props.neutral} />
      <StatisticLine text='bad' clicks={props.bad} />
      <StatisticLine text='all' clicks={total} />
      <StatisticLine text='average' clicks={average} />
      </table>
      </div>
      )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>

      <Title text='give feedback' />
      <Button text='good' clicks ={good} setClicks = {setGood} />
      <Button text='neutral' clicks ={neutral} setClicks = {setNeutral} />
      <Button text='bad' clicks ={bad} setClicks = {setBad} />
      <Title text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
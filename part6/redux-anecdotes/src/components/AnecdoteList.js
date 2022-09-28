import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import   {createNotification}  from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
function AnecdoteList() {
  const anecdotes = [...useSelector(state => state.anecdotes)]
  const filter = useSelector(state => state.filter)
  
  const dispatch = useDispatch()

  const vote = (id, content) => {
   dispatch(voteAnecdote(id))
   dispatch(createNotification(`you voted '${content}'`,3))
  }

  return (
    <div>{anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().indexOf(filter.toLowerCase())>=0)
      .sort((a,b)=>b.votes-a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}</div>
  )
}

export default AnecdoteList
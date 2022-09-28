import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdoteSlice(state, action) {
      const anecdoteAction = action.payload
      return state
      .map( 
        anecdote => {
          if(anecdote.id=== anecdoteAction.id){
            return {
              ...anecdoteAction
            }
          }
          return anecdote
        })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {voteAnecdoteSlice, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}


export const voteAnecdote = (id) => {
  return async dispatch => {
      const anecdote = await anecdoteService.getAnecdote(id)
      anecdote.votes+=1
      const vote = await anecdoteService.updateVote(id, anecdote)
      dispatch(voteAnecdoteSlice(vote))
  }
}

export default anecdoteSlice.reducer
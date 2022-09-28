import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {createNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.createNotification(`you added '${content}'`, 3)
  }

  return (
      <form onSubmit={addAnecdote}>
        <h2>create new</h2>
        <div><input name='anecdote' /></div>
        <button type='submit'>add</button>
      </form>
  )
}


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdoteReducer,
    actionAnecdote: state.notificationReducer,
  }
}

const mapDispatchToProps = {
  createAnecdote,
  createNotification
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedFilter
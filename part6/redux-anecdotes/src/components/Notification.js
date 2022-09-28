import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.actionAnecdote
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  
  return notification && <div style={style}>{notification}</div>;
}
const mapStateToProps = (state) => {
  return {
    actionAnecdote: state.actionAnecdote,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
import { connect } from "react-redux"
import { filter } from "../reducers/filterReducer"

const Filter = (props) => {
    const handleChange = (event) => {
        props.filter(event.target.value)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  const mapStateToProps = (state) => {
    return {
      filter: state.filterReducer
    }
  }

  const mapDispatchToProps = {
    filter
  }

  const ConnectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Filter)
  
  export default ConnectedFilter
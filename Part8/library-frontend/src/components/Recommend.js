import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"

const Recommend = ({show}) =>{
    const me = useQuery(ME)
    const booksFilter = useQuery(ALL_BOOKS,{variables: {genre:null}})
  
    if (!show) {
      return null
    }
    
    console.log(booksFilter.variables.genre);

    if(!me.data || !me.data.me ){
      me.refetch()
      return <div>recargando</div>
    }else{
      booksFilter.variables.genre = me.data.me.favouriteGenre
      booksFilter.refetch()
    }

        
  
      return(
        <div>
            <h1>Recommendations</h1>
            <p>books in your favourite genre <b>{me.data.me.favouriteGenre}</b></p>
            <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksFilter.data.allBooks
          .map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      )
}

export default Recommend
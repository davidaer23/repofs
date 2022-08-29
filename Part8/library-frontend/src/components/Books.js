import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_BOOKS } from "../queries"
const Books = ({show, books}) => {

  const [genre, setFilterGenre] = useState(null)
  const booksFilter = useQuery(ALL_BOOKS,{variables:{genre}})

  if(booksFilter.loading){
    return <div>loading</div>
  }
  if (!show) {
    return null
  }
  
  const genres= books.map( b => {
    return b.genres
  })
  .flat()
  .reduce((genre,item) => {
    if(!genre.includes(item)){
      genre.push(item)
    }
    return genre
  },[])

  
  return (
    <div>
      <h2>books</h2>

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
      {genres.map( g => (
        <button  onClick={() => setFilterGenre(g)} key={g}>{g}</button>
        )
      )}
      <button onClick={() => setFilterGenre(null)}>all genres</button>
    </div>
    
  )
}

export default Books

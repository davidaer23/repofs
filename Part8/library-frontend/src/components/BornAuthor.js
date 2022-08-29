import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'


const BornAuthor = ({show}) =>{
  
  const [author, setAuthor] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const resultAuthors = useQuery(ALL_AUTHORS)
    const authorsFilter = resultAuthors.data.allAuthors.filter(a => a.born===null)
   

  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, )
  
  
  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { author, birthyear } })

    setAuthor('')
    setBirthyear('')
  }
  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('person not found')
    }
 
  }, [result.data]) 

  if (!show) {
    return null
  }
  
    return(
    <div>
       <h2> Set bithyear </h2>
        <form onSubmit={submit}>
            <div>
                name:
            <select value={author}
                onChange={({target }) => setAuthor(target.value)}
                 ><option value={""} key={1}></option>
                {
                    authorsFilter.map(a => (
                        <option value={a.name} key={a.name}>{a.name}</option>
                    ))
                }
            </select>
            </div>
            <div>
            born:
            <input
                type="number"
                value={birthyear}
                onChange={({ target }) => setBirthyear(parseInt(target.value))}
            />
            
            </div>
            <button type="submit">update author</button>
        </form>
    </div>)
}

export default BornAuthor
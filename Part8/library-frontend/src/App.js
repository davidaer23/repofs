import { 
  useQuery, useMutation, useSubscription, useApolloClient
 } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import FormLogin from './components/FormLogin'
import BornAuthor from './components/BornAuthor'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
 
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })
 


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  if (result.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if(!token){
    return(
      <div>
        <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />
      <Books show={page === 'books'} books={resultBooks.data.allBooks} />
      <FormLogin show={page === 'login'} setToken={setToken} setError={notify}/>
  
      </div>
    )
  }

  

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('setBorn')}>edit author</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>Logout</button>
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />
      <Books show={page === 'books'} books={resultBooks.data.allBooks} />
      <NewBook show={page === 'add'} />
      <BornAuthor show={page === 'setBorn'}/>
      <Recommend show={page === 'recommend'} books={resultBooks.data.allBooks} />
    </div>
  )
}

export default App

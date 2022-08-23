import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
    allAuthors {
      name
      born
      bookCount
    }
}
`

export const ALL_BOOKS = gql`
query AllBooks {
    allBooks {
      title
      published
      author
    }
  }
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
    author
    id
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
mutation Mutation($author: String!, $birthyear: Int!) {
  editAuthor(name: $author, setBornTo: $birthyear) {
    name
    born
    bookCount
  }
}
`
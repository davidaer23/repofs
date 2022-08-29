const { ApolloServer, UserInputError, gql } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) =>{
  
      if(!args.author && !args.genre){
        return await Book.find({})
      }
  
      if(args.author && args.genre){
        return await Book.find({author: args.author}, {genres: { $in: args.genre}})
      }
      if(args.author){
        return await Book.find({author: args.author})
      }
      if(args.genre){
        return await Book.find({genres: { $in: args.genre}})
      } 
    } ,
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
    },
    Author: {
      bookCount: async (root) => {
        return await Book.find({author: root._id}).count()
      },
    },
    Book: {
      author: async (root) => {
        const author = await Author.findOne({ _id: root.author })
        return {
          name: author.name
        }
      },
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
    
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
  
        let newAuthor = await Author.findOne({ name : args.author })
        if(!newAuthor){
          newAuthor = new Author({name: args.author})
          try{
            await newAuthor.save()
          }catch (error){
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
        }
          args.author=newAuthor
  
          const book = new Book({...args})
          try {
            await book.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          
          pubsub.publish('BOOK_ADDED', {bookAdded: book})
  
          return book
      },
  
      editAuthor: async(root,args, context) =>{
        const currentUser = context.currentUser
    
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
  
        const author = await Author.findOne({name: args.name})
        author.born = args.setBornTo
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author
      },
  
      createUser: async (root, args) => {
        const user = new User({ ...args})
    
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
  
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
  
    },
        Subscription: {
            bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
            },
        },
  }

  module.exports = resolvers
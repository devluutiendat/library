
const { Author, Book} = require ("../model/model")
// Define resolvers
 const resolvers = {
    Query:{
      books:async() => await Book.find(),
      book:async (parent,{id}) =>{
        return await Book.findById(id)
      },
      authors:async() => await Author.find(),
      author:async (parent,{id}) =>{
        return await Author.findById(id)
      },
    },
    Mutation:{
      addBook: async (parent, args) => {     
        const newBook = new Book(args);
        const author = await Author.findById(args.authorId);    
        if (!author) {
          return "No author found";
        }    
        await author.updateOne({ $push: { bookId: newBook._id } });
        await newBook.save();       
        return newBook;
      },
       
      addAuthor:async(parent,args) =>{
        const theAuthor = new Author(args);
        theAuthor.bookId = args.bookIds
        await theAuthor.save();
        return theAuthor
      },
      updateBook:async(parent,args ) =>{
        const theBook = await Book.findById(args.id);
        const author = await Author.findById(args.authorId);
        if (author) {
            await author.updateOne({ $push: { bookId: theBook._id } });
        } else {
            throw new Error("Author not found");
        } 
        await theBook.updateOne({$set : args});
        return theBook  
      },
      updateAuthor:async(parent,args ) =>{
        const theAuthor = await Author.findById(args.id);
        await theAuthor.updateOne({$set : args});
        return theAuthor  
      },
      deleteBook:async(parent,args) =>{
        await Author.updateMany(
          {bookId : args.id},
          {$pull : {bookId : args.id}}
        )
        await Book.findByIdAndDelete(args.id);
        return ;
      },
      deleteAuthor:async(parent,args) =>{
        console.log(args);
        
        await Book.updateMany(
          {authorId : args.id},
          {authorId : null}
        );
        await Author.findByIdAndDelete(args.id);
        return ;
      },
    },  
    Author: {   
     books: async (parent) => await Book.find({ authorId: parent.id })
    }
  };
  module.exports = {resolvers}
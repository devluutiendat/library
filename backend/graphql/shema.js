 const typeDefs = `# GraphQL Schema
type Book {
  id: ID!
  title: String!
  publishedDate: String!
  genre: String!
  pages: Int!
  authorId: String!
}

type Author {
  id: ID!
  name: String!
  birthday: String!
  nationality: String!
  books: [Book]
}

type Query {
  books: [Book]
  book(id: ID!): Book
  authors: [Author]
  author(id: ID!): Author
}

type Mutation {
  addBook(title: String!, publishedDate: String!, genre: String!, pages: Int!, authorId: ID!): Book
  addAuthor(name: String!, birthday: String!, nationality: String! , bookIds :[String]): Author
  updateBook(id: ID!publishedDate: String!genre: String!pages: Int!title: String!authorId: String!): Book
  updateAuthor(id: ID!, name: String, birthday: String, nationality: String ,bookIds :[String]): Author
  deleteBook(id: ID!): Book
  deleteAuthor(id: ID!): Author
}

schema {
  query: Query
  mutation: Mutation
}   
`;
module.exports = { typeDefs };


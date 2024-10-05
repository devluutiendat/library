import axios from 'axios';

const link = "http://localhost:4000/graphql";
 export const getBookQuery = `query getData {
    books {
      id,
      title,
      publishedDate,
      genre,
      pages,
      authorId
    }
  }`;

 export const getAuthorQuery = `query getAuthor {
    authors {
      id,
      birthday,
      name,
      nationality,
      books {
        id
      }
    }
  }`;
 export const getAuthById = `query getAuthor($authorId:ID!) {
    author(id: $authorId) {
      id,
      birthday,
      name,
      nationality,
      books {
        id,
        title,
        genre,
        authorId
        pages,
        publishedDate
      }
    }
  }`;
  export const getBookById = `query getBookById($bookId: ID!){
    book(id: $bookId) {
      id,
      title,
      publishedDate,
      genre,
      pages,
      authorId
    },
    authors{
      id
    }
  }`
  export const upDateAuthor = `mutation e($updateAuthorId: ID!, $birthday: String, $nationality: String, $name: String, $bookIds: [String]){
    updateAuthor(id: $updateAuthorId,birthday: $birthday,nationality: $nationality,name: $name,bookIds: $bookIds) {
      id
    }
  },`
  export const upDateBook = `mutation e($updateBookId: ID!, $publishedDate: String!, $genre: String!, $pages: Int!, $title: String!, $authorId: String!){
    updateBook(id: $updateBookId, publishedDate: $publishedDate, genre: $genre, pages: $pages, title: $title, authorId: $authorId) {
      id
    }
  },`
  export const addBook = `mutation addBook($title: String!, $publishedDate: String!, $genre: String!, $pages: Int!, $authorId: ID!){
    addBook(title: $title, publishedDate: $publishedDate, genre: $genre, pages: $pages, authorId: $authorId) {
      id
    }
  }`
  export const addAuthor = `mutation addAuthor($name: String!, $birthday: String!, $nationality: String!){
    addAuthor(name: $name, birthday: $birthday, nationality: $nationality) {
      id
    }
  }`
  export const query = async (query,variables={}) => {
    try {
      const response = await axios.post(link, JSON.stringify({ query,variables }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response
    } catch (err) {
      console.error('Network error:', err);
    }
  };  


  export default getBookById
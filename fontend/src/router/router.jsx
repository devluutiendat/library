import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/login";
import List from "../pages/list";
import ProtectedRoute from "./protected";
import Author from "../pages/author";
import Book from "../pages/book";
import { getAuthById, getBookById, query } from "../query";
import Error from "./error";

export default createBrowserRouter([
  {
    element: <Outlet />,
    errorElement: <Error />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <List />,
            path: "/",
          },
          {
            element: <Author />,
            loader: async ({ params }) => {
              const authorId = params.authorId;
              const { data } = await query(getAuthById, { authorId });
              return data.data.author;
            },
            path: `author/:authorId`,
          },
          {
            element: <Book />,
            loader: async ({ params }) => {
              const bookId = params.bookId;
              const { data } = await query(getBookById, { bookId });
              return data.data;
            },
            path: `book/:bookId`,
          },
        ],
      },
    ],
  },
]);

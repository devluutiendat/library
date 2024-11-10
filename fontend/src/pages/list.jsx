import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { query, getAuthorQuery, getBookQuery } from "../query";
import { getAuth } from "firebase/auth";
import UserMenu from "../componemt/menu";

export default function List() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [choice, setChoice] = useState(true); // true for books, false for authors
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
    } else {
      fetchData(choice);
    }
  }, [choice, navigate]); // Ensure it fetches data when userLogin or choice changes

  const fetchData = async (choice) => {
    const choiceQuery = choice ? getBookQuery : getAuthorQuery;
    const data = await query(choiceQuery);
    if (data) {
      setData(choice ? data.data.data.books : data.data.data.authors);
    } else {
      console.error("Failed to fetch data");
    }
  };
  const handleItemClick = (itemId) => {
    if (choice) {
      navigate(`/book/${itemId}`); // Navigate to the book details
    } else {
      navigate(`/author/${itemId}`); // Navigate to the author details
    }
  };
  const handleAddClick = () => {
    if (choice) {
      navigate(`/book/newBook`); // Navigate to the book details
    } else {
      navigate(`/author/newAuthor`); // Navigate to the author details
    }
  };
  const handleSearchChange = (e) => {
    setFilter(e.target.value.toLowerCase()); // Ensure case-insensitive search
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
        <UserMenu/>
      <h2 className="text-3xl font-bold text-center mb-8">Data List</h2>
      <div className="flex justify-center mb-6">
        <button
          className={`mx-2 px-4 py-2 rounded ${
            choice ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setChoice(true)}
        >
          Books
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded ${
            !choice ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setChoice(false)}
        >
          Authors
        </button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder={`Search ${choice ? "Books" : "Authors"}...`}
          className="border border-gray-300 rounded p-2 w-full mr-2"
          value={filter}
          onChange={handleSearchChange}
        />
        <button
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
          onClick={handleAddClick}
        >
          Add
          {choice ? "book" : "author"}
        </button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data
          .filter(
            (item) =>
              choice
                ? item.title?.toLowerCase().includes(filter) // Filter books by title
                : item.name?.toLowerCase().includes(filter) // Filter authors by name
          )
          .map((item) => (
            <li
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 p-6"
            >
              {choice ? (
                <>
                  <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    {item.title}
                  </h2>
                  <p className="text-gray-700">
                    <strong>Published Date:</strong> {item.publishedDate}
                  </p>
                  <p className="text-gray-700">
                    <strong>Genre:</strong> {item.genre}
                  </p>
                  <p className="text-gray-700">
                    <strong>Pages:</strong> {item.pages}
                  </p>
                  <p className="text-gray-700">
                    <strong>Author ID:</strong>
                    {item.authorId === null ? "no updated data" : item.authorId}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200">
                    {item.name}
                  </h2>
                  <p className="text-gray-700">
                    <strong>Birthday:</strong> {item.birthday}
                  </p>
                  <p className="text-gray-700">
                    <strong>Nationality:</strong> {item.nationality}
                  </p>
                  <p className="text-gray-700">
                    <strong>Books Count:</strong> {item.books.length}
                  </p>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

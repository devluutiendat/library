import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  upDateBook,
  query,
  addBook,
  addAuthor,
  upDateAuthor,
  deleteBook,
  deleteAuthor,
} from "../ultils/query";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect } from "react";

const FormAction = ({ type, id, initialData }) => {
  useEffect(() => {
    console.log();
  }, []);
  const initType = type === "book" && initialData.authors;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: type === "book" ? initialData.book : initialData,
  });

  const onSubmit = async (data) => {
    try {
      let formattedData = { ...data };

      if (type === "book") {
        formattedData.pages = parseInt(data.pages, 10);
      }
      
      if (id === "newBook" || id === "newAuthor") {
        if (type === "book") {
          await query(addBook, formattedData);
        } else {
          await query(addAuthor, data);
        }
      } else {
        if (type === "book") {
          formattedData.updateBookId = id;
          await query(upDateBook, formattedData);
        } else {
          data.updateAuthorId = id;
          await query(upDateAuthor, data);
        }
      }
      navigate("/");
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (type === "book") {
        console.log(1);
        
        await query(deleteBook, { deleteBookId: id });
      } else {
        await query(deleteAuthor, { deleteAuthorId: id });
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{type} Details</h1>
      <FaTrashAlt className="text-2xl my-4" onClick={handleDelete} />
      <p className="text-gray-600 mb-4">
        {type} ID: {id || "N/A"}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {type === "book" ? (
          <>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full p-3 border border-gray-300 rounded-md text-2xl font-semibold text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}

            <input
              {...register("genre", { required: "Genre is required" })}
              className="w-full p-3 border border-gray-300 rounded-md text-2xl font-semibold text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter book genre"
            />
            {errors.genre && (
              <p className="text-red-500">{errors.genre.message}</p>
            )}

            <input
              type="date"
              {...register("publishedDate", {
                required: "Published date is required",
              })}
              className="w-full p-3 border border-gray-300 rounded-md text-2xl font-semibold text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.publishedDate && (
              <p className="text-red-500">{errors.publishedDate.message}</p>
            )}

            <input
              type="number"
              {...register("pages", {
                required: "Number of pages is required",
                min: { value: 1, message: "Pages must be at least 1" },
              })}
              className="w-full p-3 border border-gray-300 rounded-md text-2xl font-semibold text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter book pages"
            />
            {errors.pages && (
              <p className="text-red-500">{errors.pages.message}</p>
            )}

            <select
              {...register("authorId", { required: "Author is required" })}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {initType.map((item) => (
                <option key={item.id} value={item.id || "no updated data"}>
                  {item.name || "no updated data"}
                </option>
              ))}
            </select>
            {errors.authorId && (
              <p className="text-red-500">{errors.authorId.message}</p>
            )}

            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150"
            >
              {id === "newBook" ? "Add" : "Update"} Book
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border border-gray-300 rounded-md text-2xl font-semibold text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter author name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <input
              type="date"
              {...register("birthday", { required: "Birthday is required" })}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.birthday && (
              <p className="text-red-500">{errors.birthday.message}</p>
            )}

            <input
              type="text"
              {...register("nationality", {
                required: "Nationality is required",
              })}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter nationality"
            />
            {errors.nationality && (
              <p className="text-red-500">{errors.nationality.message}</p>
            )}

            <button
              type="submit"
              className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150"
            >
              {id !== "newBook" && id !== "newAuthor" ? "update" : "add"}
              {type === "book" ? " book" : " author"}
            </button>
          </>
        )}
      </form>

      {type === "author" && initialData && (
        <>
          <h3 className="text-xl font-semibold text-gray-800 mt-4">Books:</h3>
          <ul className="list-disc list-inside ml-5">
            {initialData.books.map((book) => (
              <li key={book.id} className="text-gray-700 mb-2">
                <strong>{book.title}</strong> -{" "}
                <span className="italic">{book.genre}</span> ({book.pages}{" "}
                pages)
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FormAction;

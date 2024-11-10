import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { upDateBook, query, addBook } from '../query';

const Book = () => {
  const { bookId } = useParams();
  const initialData = useLoaderData();
  const authors = initialData.authors;
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialData.book });
  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        pages: parseInt(data.pages, 10) 
      };
      if (bookId !== "newBook") {        
        formattedData.updateBookId = bookId;
        await query(upDateBook, formattedData);
        navigate("/")
      }else{
        await query(addBook, formattedData);
        navigate("/")
      }
    } catch (error) {
      console.error("Error adding data:", error);   
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Book Details</h1>
      <p className="text-gray-600 mb-4">Book ID: {bookId}</p>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          {...register('title', { required: 'Title is required' })} 
          className="w-full p-3 border border-gray-300 rounded-md text-2xl font-semibold text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter book title"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <input 
          {...register('genre', { required: 'Genre is required' })} 
          className="w-full p-3 border border-gray-300 rounded-md text-2xl font-semibold text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter book genre"
        />
        {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}

        <input 
          type="date"
          {...register('publishedDate', { required: 'Published date is required' })} 
          className="w-full p-3 border border-gray-300 rounded-md text-2xl font-semibold text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.publishedDate && <p className="text-red-500">{errors.publishedDate.message}</p>}

        <input 
          type="number"
          {...register('pages', { required: 'Number of pages is required', min: { value: 1, message: 'Pages must be at least 1' } })} 
          className="w-full p-3 border border-gray-300 rounded-md text-2xl font-semibold text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter book pages"
        />
        {errors.pages && <p className="text-red-500">{errors.pages.message}</p>}
        
        <select {...register('authorId', { required: 'Author is required' })} className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Select Author</option>
          {authors.map(item => (
            <option key={item.id} value= 
            {item.id === null ? "no updated data" : item.id}>
              {item.id === null ? "no updated data" : item.id}
            </option>
          ))}
        </select>
        {errors.authorId && <p className="text-red-500">{errors.authorId.message}</p>}

        <button type="submit" 
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150"
        >
          {bookId === "newBook" ? "add" : "update"} Book
        </button>
      </form>
    </div>
  );
};

export default Book;

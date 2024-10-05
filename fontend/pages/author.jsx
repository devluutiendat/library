import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addAuthor, query, upDateAuthor } from '../src/query';

const Author = () => {
  const { authorId } = useParams();
  const initialData = useLoaderData();
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialData });
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      if (!initialData) {
        await query(addAuthor,data);
        navigate("/")
      }else{
        data.updateAuthorId = authorId;
        await query(upDateAuthor,data);
        navigate("/")
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Author Details</h1>
      <p className="text-gray-600 mb-4">Author ID: {authorId}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          type="text" 
          {...register('name', { required: 'Name is required' })} 
          className="w-full p-3 border border-gray-300 rounded-md text-2xl font-semibold text-gray-800 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter author name"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        
        <input 
          type="date" 
          {...register('birthday', { required: 'Birthday is required' })} 
          className="w-full p-3 border border-gray-300 rounded-md text-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.birthday && <p className="text-red-500">{errors.birthday.message}</p>}
        
        <input 
          type="text" 
          {...register('nationality', { required: 'Nationality is required' })} 
          className="w-full p-3 border border-gray-300 rounded-md text-gray-600 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter nationality"
        />
        {errors.nationality && <p className="text-red-500">{errors.nationality.message}</p>}

        <button type="submit" 
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150"
        >
          {initialData ? "update" : "add"} Author
        </button>
      </form>
      
     <h3 className="text-xl font-semibold text-gray-800 mt-4">Books:</h3>
{
  initialData &&
      <ul className="list-disc list-inside ml-5">
        {initialData.books.map(book => (
          <li key={book.id} className="text-gray-700 mb-2">
            <strong>{book.title}</strong> - <span className="italic">{book.genre}</span> ({book.pages} pages)
          </li>
        ))}
      </ul>
 }   </div>
  );
};

export default Author;

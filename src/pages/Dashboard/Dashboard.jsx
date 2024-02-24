import { useState } from 'react';
import { moviesData } from '../../assets/data';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const filteredMovies = moviesData.filter((movie) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='container mx-auto mt-9 p-5'>
      <h1 className='text-3xl font-bold mb-5'>Movies Collection</h1>
      <input
        type='text'
        placeholder='Search by title...'
        className='border text-gray-900 bg-[#EEEEEE] border-gray-300 px-4 py-2 rounded-md mb-5 w-full'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/dashboard/${movie.id}`, { state: movie })}
            className='bg-[#EEEEEE] rounded-lg shadow-md p-5 cursor-pointer'
          >
            <h2 className='text-start text-gray-900 font-bold text-xl  mb-2'>
              {movie.title}
            </h2>
            <p className='text-start text-gray-900 mb-2 font-semibold'>
              {movie.director}
            </p>
            {/* <p className='text-justify text-gray-600 mb-2'>{movie.summary}</p> */}
            <p className='text-end text-gray-600'>
              {Array.isArray(movie.genre) && movie.genre.length >= 2
                ? movie.genre.join(', ')
                : movie.genre}
            </p>
          </div>
        ))}
      </div>
      <div className='fixed bottom-5 right-5'>
        <button
          onClick={() => navigate('/dashboard/add')}
          className='bg-cyan-500 shadow-cyan-500/65 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-full shadow-lg
           focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-opacity-50
          '
        >
          +
        </button>
      </div>
    </div>
  );
}

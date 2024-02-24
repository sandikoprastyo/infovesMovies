import { useState } from 'react';
import { moviesData } from '../../assets/data';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isHovered, setIsHovered] = useState(false);
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
        className='border text-gray-900 bg-[#EEEEEE] border-gray-300 px-4 py-2 rounded-md mb-5 w-full 
        focus:border-cyan-500 focus:ring-cyan-500 focus:ring-2 focus:ring-offset-cyan-500'
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {filteredMovies.map((movie, index) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/dashboard/${movie.id}`, { state: movie })}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(false)}
            className='bg-[#EEEEEE] rounded-lg shadow-lg hover:shadow-2xl hover:shadow-cyan-500/65 p-5 cursor-pointer hover:ring-4 hover:ring-cyan-600 flex flex-col justify-between'
          >
            <h2
              className={`capitalize text-start  font-bold text-xl mb-2 ${
                isHovered === index ? 'text-cyan-500' : 'text-gray-900'
              } `}
            >
              {movie.title.length > 20
                ? movie.title.substring(0, 19) + '..'
                : movie.title}
            </h2>
            <p
              className={`capitalize text-start mb-2 font-semibold ${
                isHovered === index ? 'text-cyan-500' : 'text-gray-900'
              }`}
            >
              {movie.director.length > 20
                ? movie.director.substring(0, 19) + '..'
                : movie.director}
            </p>
            {/* <p className='text-justify text-gray-600 mb-2'>{movie.summary}</p> */}
            <p className='text-end bottom-0 right-0'>
              {Array.isArray(movie.genre) && movie.genre.length >= 2 ? (
                <button
                  className={`py-2 px-4 rounded-lg  bg-pink-500 text-white shadow-lg shadow-pink-500/65
                  focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-pink-600`}
                >
                  {movie.genre.join(', ')}
                </button>
              ) : (
                <button
                  className={`py-2 px-4 rounded-lg  bg-pink-500 text-white shadow-lg shadow-pink-500/65
                    focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-pink-600`}
                >
                  {movie.genre}
                </button>
              )}
            </p>
          </div>
        ))}
      </div>

      {!filteredMovies.length && (
        <div className='flex text-center justify-center w-full'>
          No movies found.
        </div>
      )}

      <div className='fixed bottom-5 right-5'>
        <button
          onClick={() => navigate('/dashboard/add')}
          className='bg-cyan-600 hover:shadow-cyan-500/65 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-full hover:shadow-lg
           focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-opacity-50
          '
        >
          +
        </button>
      </div>
    </div>
  );
}

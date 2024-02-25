import { useState } from 'react';
import { moviesData } from '../../assets/data';
import { useNavigate } from 'react-router-dom';
import noData from '../../assets/no_data.svg';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const filteredMovies = moviesData.filter((movie) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='container mx-auto mt-9 p-5 font-mono'>
      <h1 className='text-3xl font-bold mb-5'>Movies Collection</h1>
      <input
        type='text'
        placeholder='Search by title...'
        className='font-mono border text-gray-900 bg-[#EEEEEE] border-gray-300 px-4 py-2 rounded-md mb-5 w-full 
        focus:border-cyan-500 focus:ring-cyan-500 focus:ring-2 focus:ring-offset-cyan-500'
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 shadow-lg'>
        {filteredMovies.map((movie, index) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/dashboard/${movie.id}`, { state: movie })}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(false)}
            className='bg-[#EEEEEE] rounded-lg shadow-lg hover:shadow-2xl hover:shadow-cyan-500/65 p-0 cursor-pointer hover:ring-4 hover:ring-cyan-600 flex flex-col justify-between
            transition-transform duration-500 transform hover:scale-105
            '
          >
            <img
              alt='img'
              src={`${movie.image}`}
              className='rounded-md rounded-b-sm object-cover h-full w-screen mb-5 shadow-lg shadow-gray-700/50 '
              style={{ maxWidth: '100%' }}
            />
            <div className='absolute rounded-lg inset-0 bg-gradient-to-r from-transparent to-black opacity-0 hover:opacity-30 transition-opacity duration-300'></div>

            <h2
              className={`p-2 capitalize text-start  font-bold text-xl mb-1 ${
                isHovered === index ? 'text-cyan-500' : 'text-gray-900'
              } `}
            >
              {movie.title.length > 17
                ? movie.title.substring(0, 17) + '..'
                : movie.title}
            </h2>
            <p
              className={`px-2 capitalize text-start mb-2 font-semibold ${
                isHovered === index ? 'text-cyan-500' : 'text-gray-900'
              }`}
            >
              {movie.director.length > 20
                ? movie.director.substring(0, 19) + '..'
                : movie.director}
            </p>
            {/* <p className='text-justify text-gray-600 mb-2'>{movie.summary}</p> */}
            <p className=' p-2 text-end bottom-0 right-0 pt-16'>
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
        <div className='flex flex-col mt-10 text-center justify-center items-center w-full'>
          <img src={noData} alt='img' width={300} height={300} />
          <p className='pt-5 font-bold'>No movies found.</p>
        </div>
      )}

      <div className='fixed bottom-5 right-5'>
        <button
          onClick={() => navigate('/dashboard/add')}
          className='shadow-cyan-500/65 bg-cyan-500 text-white font-bold py-2 px-4 rounded-full shadow-lg
           focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-opacity-50
          '
        >
          +
        </button>
      </div>
    </div>
  );
}

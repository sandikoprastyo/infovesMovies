import { useState } from 'react';

export default function Form({
  err,
  setErr,
  data,
  refForm,
  handleGenreClick,
  genreStatus,
}) {
  const [lengSummary, setLengSummary] = useState();

  return (
    <form
      className='font-mono space-y-4 container bg-[#EEEEEE] rounded-lg p-11 text-start shadow-2xl shadow-[#EEEEEE]-500/50'
      ref={refForm}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label
          htmlFor='title'
          className='block text-sm font-bold text-gray-700'
        >
          Title
        </label>
        <input
          type='text'
          id='title'
          onChange={() => setErr({ ...err, title: '' })}
          defaultValue={data?.title}
          className={`appearance-none relative ring-1 mt-2 block w-full px-3 py-2 border placeholder-gray-500 bg-[#EEEEEE] text-gray-500 rounded-md focus:outline-none focus:z-10 sm:text-sm mb-2 ${
            err.title
              ? 'focus:ring-red-500 focus:border-red-500 border-red-500 ring-1'
              : 'focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 ring-1'
          }`}
          placeholder='Enter title'
        />
        {err?.title && (
          <p className='text-start py-2 -mt-3 text-red-500 text-xs'>
            {err?.title}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor='director'
          className='block text-sm font-bold text-gray-700'
        >
          Director
        </label>
        <input
          type='text'
          id='director'
          onChange={() => setErr({ ...err, director: '' })}
          defaultValue={data?.director}
          className={`appearance-none relative ring-1 mt-2 block w-full px-3 py-2 border placeholder-gray-500 bg-[#EEEEEE] text-gray-500 rounded-md focus:outline-none  focus:z-10 sm:text-sm mb-2 ${
            err.director
              ? 'focus:ring-red-500 focus:border-red-500 border-red-500 ring-1'
              : 'focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 ring-1'
          }`}
          placeholder='Enter director'
        />
        {err?.director && (
          <p className='text-start py-2 -mt-3 text-red-500 text-xs'>
            {err?.director}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor='summary'
          className='block text-sm font-bold text-gray-700'
        >
          Summary
        </label>
        <textarea
          id='summary'
          rows='3'
          defaultValue={data?.summary}
          onChange={(e) => {
            setErr({ ...err, summary: '' });
            setLengSummary(e.target.value.length);
          }}
          className={`appearance-none relative ring-1 mt-2 block w-full px-3 py-2 border placeholder-gray-500 bg-[#EEEEEE] text-gray-500 rounded-md focus:outline-none focus:z-10 sm:text-sm mb-2 max-h-48 ${
            lengSummary === 100 || err.summary
              ? 'focus:ring-red-500 focus:border-red-500 border-red-500 ring-1 '
              : 'focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 ring-1'
          }`}
          placeholder='Enter summary'
          maxLength={100}
        />
        {err?.summary && (
          <p className='text-start py-2 -mt-3 text-red-500 text-xs'>
            {err?.summary}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor='genre'
          className='block text-sm font-bold text-gray-700'
        >
          Genre
        </label>
        {err?.genre && (
          <p className='text-start py-2 -mt-3 text-red-500 text-xs'>
            {err?.genre}
          </p>
        )}
        <div className='flex flex-wrap gap-2 mt-2'>
          {genreStatus.map((el, i) => (
            <button
              key={i}
              onClick={() => handleGenreClick(el.name)}
              className={`py-2 px-4 rounded-lg focus:outline-none focus:ring-2  focus:ring-opacity-50 ${
                el.check
                  ? 'bg-cyan-500 text-white focus:ring-cyan-600 shadow-lg shadow-cyan-500/65'
                  : 'bg-pink-500 text-white focus:ring-pink-600 shadow-lg shadow-pink-500/65'
              }`}
            >
              {el.name}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}

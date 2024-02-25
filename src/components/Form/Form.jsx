import { useState } from 'react';

export default function Form({
  err,
  setErr,
  data,
  refForm,
  handleGenreClick,
  handleImageUpload,
  previewImage,
  setPreviewImage,
  maxSize,
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
          defaultValue={
            data?.summary && data.summary.length <= 100
              ? data.summary
              : data?.summary
              ? data.summary.substring(0, 100) + '...'
              : ''
          }
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
      <div className='col-span-full'>
        <label
          htmlFor='posterImage'
          className='block text-sm font-bold text-gray-700'
        >
          Poster Image
        </label>
        <div
          className={`flex justify-center items-center appearance-none relative ring-1 mt-2 w-full h-full border placeholder-gray-500 bg-[#EEEEEE] text-gray-500 rounded-md focus:outline-none focus:z-10 sm:text-sm mb-2 ${
            err.image
              ? 'focus:ring-red-500 focus:border-red-500 border-red-500 ring-1'
              : 'focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 ring-1'
          }
        `}
        >
          {previewImage && (
            <img
              src={previewImage}
              alt='preview'
              className='object-cover h-full w-full rounded-md p-0 m-0'
              onClick={() => setPreviewImage('')}
            />
          )}
          {!previewImage && (
            <div className='text-center'>
              <svg
                className='mx-auto h-25 w-25 -mb-5 text-gray-300'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
                  clipRule='evenodd'
                />
              </svg>
              <div
                htmlFor='posterImage'
                className='mt-2 mb-2 flex justify-center text-sm leading-6 text-gray-600'
              >
                <label
                  htmlFor='posterImage'
                  className='relative cursor-pointer rounded-md bg-gray-500 p-1 -mt-1 font-semibold text-slate-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 hover:text-white'
                >
                  <span>Upload a file</span>
                  <input
                    type='file'
                    id='posterImage'
                    name='posterImage'
                    onChange={handleImageUpload}
                    className='sr-only'
                    accept='.jpg,.jpeg,.png'
                  />
                </label>
              </div>
              <p className='text-xs leading-5 text-gray-600'>
                {`PNG, JPG, JPEG up to ${Math.floor(
                  (maxSize * 24) / 8 / (1024 * 1024),
                )} MB`}
              </p>
            </div>
          )}
        </div>
        {err?.image && (
          <p className='text-start py-2 -mt-3 text-red-500 text-xs'>
            {err?.image}
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


export default function Form({ data, refForm,  handleGenreClick, genreStatus }) {
  return (
    <form
      className='space-y-4 container bg-[#EEEEEE] rounded-lg p-11 text-start shadow-2xl shadow-[#EEEEEE]-500/50'
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
          defaultValue={data?.title}
          className='appearance-none relative ring-1 block w-full px-3 py-2 mt-2 border border-gray-300 placeholder-gray-500 bg-[#EEEEEE] text-gray-900 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm mb-2'
          placeholder='Enter title'
        />
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
          defaultValue={data?.director}
          className='appearance-none relative ring-1 mt-2 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-[#EEEEEE] text-gray-900 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm mb-2'
          placeholder='Enter director'
        />
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
          className='appearance-none relative ring-1 mt-2 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-[#EEEEEE] text-gray-900 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm mb-2'
          placeholder='Enter summary'
          maxLength={100}
        ></textarea>
      </div>
      <div>
        <label
          htmlFor='genre'
          className='block text-sm font-bold text-gray-700'
        >
          Genre
        </label>
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

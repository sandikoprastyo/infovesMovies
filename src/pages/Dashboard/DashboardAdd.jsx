import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { useRef, useState } from 'react';
import { genreData, moviesData } from '../../assets/data';

export default function DashboardAdd() {
  const refForm = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({
    title: '',
    director: '',
    summary: '',
    genre: '',
  });
  const [genreStatus, setGenreStatus] = useState(genreData);

  const handleGenreClick = (genreName) => {
    const updatedGenreStatus = genreStatus.map((genre) => {
      if (genre.name === genreName) {
        return {
          ...genre,
          check: !genre.check,
        };
      }
      return genre;
    });
    setGenreStatus(updatedGenreStatus);
  };

  const handleSave = () => {
    const refForms = refForm.current.elements;
    const id = moviesData.length + 1;
    const title = refForms.title.value;
    const director = refForms.director.value;
    const summary = refForms.summary.value;
    const checkedGenres = genreStatus.filter((genre) => genre.check === true);
    const genre = checkedGenres.map((genre) => genre.name);
    
    if (!title) return setErr({ title: 'title is required' });
    if (!director) return setErr({ director: 'director is required' });
    if (!summary) return setErr({ summary: 'summary is required' });
    if (!genre.length) return setErr({ genre: 'genre is required' });
    
    setLoading(true);
    if (title && director && summary && genre) {
      const newData = { id, title, summary, director, genre };
      moviesData.push(newData);
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 500);
    }
  };

  return (
    <>
      <div className='container mx-auto mt-9 p-5 font-mono'>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={() => navigate('/dashboard')}
            className='bg-black-200 shadow-2xl shadow-black-500/65 text-white py-2 px-4 rounded-full hover:bg-black-800 hover:ring-white-300 ring-[#EEEEEE] ring-1'
          >
            Back
          </button>
          <button
            onClick={handleSave}
            className='bg-cyan-500 shadow-lg shadow-cyan-500/65 text-white py-2 px-4 rounded-full hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50'
          >
            {loading ? 'Loading...' : 'Save'}
          </button>
        </div>
      </div>
      <Form
        err={err}
        setErr={setErr}
        refForm={refForm}
        genreStatus={genreStatus}
        handleGenreClick={handleGenreClick}
      />
    </>
  );
}

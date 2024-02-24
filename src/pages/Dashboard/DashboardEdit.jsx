/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useLocation } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { useEffect, useRef, useState } from 'react';
import { genreData, moviesData } from '../../assets/data';

export default function DashboardEdit() {
  const refForm = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [genreStatus, setGenreStatus] = useState(genreData);

  useEffect(() => {
    if (!location.state) return navigate('/dashboard');
    const updatedGenreStatus = genreStatus.map((genre) => {
      if (location?.state?.genre?.includes(genre?.name)) {
        return {
          ...genre,
          check: true,
        };
      }
      return genre;
    });
    setGenreStatus(updatedGenreStatus);
  }, []);

  const handleDelete = () => {
    setLoadingDelete(true);
    const dataId = location.state.id;
    const indexToDelete = moviesData.findIndex((movie) => movie.id === dataId);

    if (indexToDelete !== -1) {
      delete moviesData[indexToDelete];
    }

    setTimeout(() => {
      setLoadingDelete(false);
      navigate('/dashboard');
    }, 500);
  };

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

  const handleUpdate = () => {
    setLoading(true);
    const refForms = refForm.current.elements;
    const id = location.state.id;
    const title = refForms.title.value;
    const director = refForms.director.value;
    const summary = refForms.summary.value;
    const checkedGenres = genreStatus.filter((genre) => genre.check === true);
    const genre = checkedGenres.map((genre) => genre.name);
    const newData = { id, title, summary, director, genre };
    const dataId = moviesData.find((el) => el.id === location.state.id);
    dataId.title = newData.title;
    dataId.director = newData.director;
    dataId.summary = newData.summary;
    dataId.genre = newData.genre;

    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <>
      <div className='container mx-auto mt-9 p-5'>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={() => navigate('/dashboard')}
            className='bg-black-200 shadow-2xl shadow-black-500/65 text-white py-2 px-4 rounded-full hover:bg-black-800 hover:ring-white-300 ring-[#EEEEEE] ring-1'
          >
            Back
          </button>
          <button
            onClick={handleDelete}
            className='bg-red-500 shadow-lg shadow-red-500/65 text-white py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
          >
            {loadingDelete ? 'Loading...' : 'Delete'}
          </button>
          <button
            onClick={handleUpdate}
            className='bg-cyan-500 shadow-lg shadow-cyan-500/65 text-white py-2 px-4 rounded-full hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-opacity-50'
          >
            {loading ? 'loading..' : 'Update'}
          </button>
        </div>
      </div>
      <Form
        data={location.state}
        refForm={refForm}
        genreStatus={genreStatus}
        handleGenreClick={handleGenreClick}
      />
    </>
  );
}

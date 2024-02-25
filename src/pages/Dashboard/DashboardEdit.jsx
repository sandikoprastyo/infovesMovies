/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useLocation } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { useEffect, useRef, useState } from 'react';
import { genreData, moviesData } from '../../assets/data';

export default function DashboardEdit() {
  const refForm = useRef();
  const maxSize = 1024 * 1024;
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [genreStatus, setGenreStatus] = useState(genreData);
  const [previewImage, setPreviewImage] = useState();
  const [err, setErr] = useState({
    title: '',
    director: '',
    summary: '',
    genre: '',
    image: '',
  });

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
    dataURItoBlob(location.state.image);
  }, []);

  const dataURItoBlob = (dataURI) => {
    if (
      /^data:image\/png;base64,/.test(dataURI) ||
      /^data:image\/jpg;base64,/.test(dataURI) ||
      /^data:image\/jpeg;base64,/.test(dataURI)
    ) {
      const [, base64] = dataURI.split(';base64,');

      // Membuat blob dari base64
      const byteCharacters = atob(base64);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, { type: 'image/png' }); // Ganti type jika perlu

      // Mengatur blob sebagai sumber gambar untuk ditampilkan
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageDataURL = e.target.result;
        setPreviewImage(imageDataURL);
      };
      reader.readAsDataURL(blob);
    } else {
      return setPreviewImage(`${dataURI}`);
    }
  };

  const handleDelete = () => {
    setLoadingDelete(true);
    const dataId = location.state.id;
    const indexToDelete = moviesData.findIndex((movie) => movie?.id === dataId);
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
    const refForms = refForm.current.elements;
    const id = location.state.id;
    const title = refForms.title.value;
    const director = refForms.director.value;
    const summary = refForms.summary.value;
    const image = previewImage;
    const checkedGenres = genreStatus.filter((genre) => genre.check === true);
    const genre = checkedGenres.map((genre) => genre.name);

    if (!title) return setErr({ title: 'title is required' });
    if (!director) return setErr({ director: 'director is required' });
    if (!summary) return setErr({ summary: 'summary is required' });
    if (!image) return setErr({ image: 'image is required' });
    if (!genre.length) return setErr({ genre: 'genre is required' });

    setLoading(true);
    if (title && director && summary && genre) {
      const newData = { id, title, summary, director, genre, image };
      const dataId = moviesData.find((el) => el.id === location.state.id);
      if (dataId) {
        dataId.title = newData.title;
        dataId.director = newData.director;
        dataId.summary = newData.summary;
        dataId.image = newData.image;
        dataId.genre = newData.genre;

        setTimeout(() => {
          setLoading(false);
          navigate('/dashboard');
        }, 500);
      } else {
        const newData = { id, title, summary, director, genre, image };
        moviesData.push(newData);

        setTimeout(() => {
          setLoading(false);
          navigate('/dashboard');
        }, 500);
      }
    }
  };

  const handleImageUpload = (event) => {
    setErr({ ...err, image: '' });
    const file = event?.target?.files?.[0];
    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxwidth = 2500;
    const maxheight = 2500;

    if (file) {
      if (!allowedFormats.includes(file.type)) {
        setErr({ image: 'format image must be jpg/jpeg/png' });
        event.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
          const width = img.width;
          const height = img.height;

          if (width > maxwidth || height > maxheight) {
            setErr({
              image: `Image size cannot be larger than ${maxwidth}x${maxheight}`,
            });
            event.target.value = '';
            return;
          }

          if (file.size > maxSize) {
            setErr({
              image: `Image size cannot be larger than ${Math.floor(
                (maxSize * 24) / 8 / (1024 * 1024),
              )} MB`,
            });
            event.target.value = '';
            return;
          }

          setPreviewImage(e.target.result);
        };
      };
      reader.readAsDataURL(file);
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
        err={err}
        setErr={setErr}
        data={location.state}
        refForm={refForm}
        genreStatus={genreStatus}
        maxSize={maxSize}
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
        handleImageUpload={handleImageUpload}
        handleGenreClick={handleGenreClick}
      />
    </>
  );
}

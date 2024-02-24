import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const ref = useRef();
  const [err, setErr] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const refForm = ref.current.elements;
    const email = refForm.email.value;
    const password = refForm.password.value;
    if (!email) {
      setErr({ email: 'Email is required' });
    } else if (!password) {
      setErr({ password: 'Passwrod is required' });
    } else {
      // const data = { email, password };
      // console.log(data);
      // dispatch with data
      navigate('/dashboard');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-md w-full space-y-8 p-10 bg-[#EEEEEE] rounded-lg shadow-lg'>
        <div>
          <h2 className='mt-1 text-center text-3xl font-extrabold text-gray-900'>
            Sign in
          </h2>
        </div>
        <form className='mt-8 space-y-6' ref={ref} onSubmit={handleSubmit}>
          <input type='hidden' name='remember' value='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                onChange={() => setErr('')}
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-[#EEEEEE] text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2'
                placeholder='Email address'
              />
              {err?.email && (
                <p className='text-start py-2 -mt-3 text-red-500 text-xs'>
                  {err?.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                onChange={() => setErr('')}
                autoComplete='current-password'
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-[#EEEEEE] text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2'
                placeholder='Password'
              />
              {err?.password && (
                <p className='text-start py-2 -mt-1 text-red-500 text-xs'>
                  {err?.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

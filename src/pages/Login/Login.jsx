import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({
    email: '',
    password: '',
    global: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const refForm = ref.current.elements;
    const email = refForm.email.value;
    const password = refForm.password.value;

    if (!email) setErr({ email: 'Email is required' });
    if (!password) setErr({ password: 'Passwrod is required' });

    if (email && password) {
      const isEmailRoot = email.includes('root@example.com');
      const isPasswordRoot = password.includes('root');

      if (isEmailRoot && isPasswordRoot) {
        setTimeout(() => {
          setLoading(false);
          navigate('/dashboard');
        }, 500);
      } else {
        setLoading(false);
        setErr({ global: 'Email or password is invalid' });
      }
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
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-[#EEEEEE] text-gray-900 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm mb-2'
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
                className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 bg-[#EEEEEE] text-gray-900 rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm mb-2'
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
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-cyan-500 shadow-lg shadow-cyan-500/50'
            >
              {loading ? 'Loading...' : 'Sign in'}
            </button>
            {err?.global && (
              <p className='text-start py-2 -mt-1 text-red-500 text-xs'>
                {err?.global}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

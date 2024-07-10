import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../../components/OAuth';

const DevSignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'developer', 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      role: 'developer',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      navigate('/sign-in');
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url('https://res.cloudinary.com/dh1lgpmm4/image/upload/v1697791025/AlaaProjects/ARREALSTATE/%D8%AA%D8%B5%D9%85%D9%8A%D9%85_%D8%A8%D8%AF%D9%88%D9%86_%D8%B9%D9%86%D9%88%D8%A7%D9%86_5_lquckw.png')` }}>
      <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='max-w-md w-full p-8 bg-white rounded-md shadow-lg'>
        <h1 className='text-3xl text-center font-semibold mb-5 text-gray-800'>
          Sign Up for Developer
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div className='flex flex-col'>
            <label htmlFor='username' className='text-gray-700'>
              Username
            </label>
            <input
              type='text'

              placeholder='Enter your username'
              className='border rounded-md py-2 px-4 focus:outline-none focus:ring-2'
              id='username'
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='email' className='text-gray-700'>
              Email
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              className='border rounded-md py-2 px-4 focus:outline-none focus:ring-2'
              id='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='password' className='text-gray-700'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter your password'
              className='border rounded-md py-2 px-4 focus:outline-none focus:ring-2'
              id='password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            disabled={loading}
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            type='submit'
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
   
          <div className='flex items-center justify-center mt-8 text-gray-600'>
            <p>Already have an account?</p>
            <Link to='/sign-in' className='text-blue-700 ml-2'>
              Sign in
            </Link>
          </div>

          {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
          {success && <p className='text-green-500 mt-5 text-center'>Signup successful! Please sign in.</p>}
        </div>
      </div>
    </div>
  );
};

export default DevSignUp;

import React, { useEffect, useState } from 'react';
import { Link , useNavigate  } from 'react-router-dom';

const MicroDeveloperSignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [developers, setDevelopers] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchDevelopers = async () => {
    try {
      const response = await fetch('/api/user?role=developer');
      const data = await response.json();

      setDevelopers(data);
    } catch (error) {
      console.error('Error fetching developers:', error);
    }
  };

  fetchDevelopers();
}, []);



  const handleChange = (e) => {
    if (e.target.id === 'preferredDeveloper') {
      const selectedDeveloper = developers.find(
        (developer) => developer.username === e.target.value
      );
  
      setFormData({
        ...formData,
        associatedDeveloper: selectedDeveloper ? selectedDeveloper._id : '',
        [e.target.id]: e.target.value,
        role: 'microdeveloper',
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
        role: 'microdeveloper',
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/microdevelopersignup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      navigate('/sign-in'); 
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };



  return (
    <section className='h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0'>
      <div className='md:w-1/3 max-w-sm'>
        <img src="https://media.istockphoto.com/id/1409298953/photo/real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is-complete.webp?s=612x612&w=is&k=20&c=BNy-JR7B2895fvdYHZjGVsJoc_Bb6LERp_NpUjXBtR4=" />
      </div>
      <div className='md:w-1/3 max-w-sm'>
        <div className='text-center md:text-left'>
      
        <div className='my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300'>
          <p className='mx-4 mb-0 text-center font-semibold text-slate-500'>Sign Up</p>
        </div>
        {/* Username input */}
        <input
          className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded'
          type='text'
          placeholder='Username'
          id='username' // Match the id to your form data
          onChange={handleChange} // Handle input change
        />
        {/* Email input */}
        <input
          className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4'
          type='text'
          placeholder='Email Address'
          id='email' // Match the id to your form data
          onChange={handleChange} // Handle input change
        />
        {/* Password input */}
        <input
          className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4'
          type='password'
          placeholder='Password'
          id='password' // Match the id to your form data
          onChange={handleChange} // Handle input change
        />
        {/* Developer selection */}
        <select
            id='preferredDeveloper'
            className='text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4'
            onChange={handleChange}
          >
            <option value=''>Select a Developer</option>
            {developers.map((developer) => (
              <option key={developer._id} value={developer.username}>
                {developer.username}
              </option>
            ))}
          </select>
        {/* Sign up button */}
        <div className='text-center md:text-left'>
          <button
            className='mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider'
            type='submit'
            onClick={handleSubmit} // Handle form submission
          >
            Sign Up
          </button>
        </div>
        {/* Error message display */}
        {error && <p className='text-red-500 mt-5'>{error}</p>}
        {/* Already have an account link */}
        <div className='mt-4 font-semibold text-sm text-slate-500 text-center md:text-left'>
          Already have an account?{' '}
          <Link className='text-red-600 hover:underline hover:underline-offset-4' to='/sign-in'>
            Sign In
          </Link>
        </div>
      </div>
      </div>

    </section>
  );
};

export default MicroDeveloperSignUp;

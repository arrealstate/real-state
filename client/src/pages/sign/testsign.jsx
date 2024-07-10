import React, { useState } from 'react';

const LoginFormComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    // Perform login logic here (e.g., API call)

    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const inputClasses = (errorCondition) =>
    `border rounded-md p-2 text-gray-700 ${errorCondition ? 'border-red-500' : ''}`;

  return (
    <div className={`flex flex-col items-center p-4 ${errorMessage ? 'bg-gray-100 border rounded-md' : ''}`}>
      <h2 className='font-semibold text-gray-700 text-2xl mb-4'>Login</h2>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <div className='flex flex-col items-start gap-1'>
          <label htmlFor='email' className='font-semibold text-gray-700'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={handleEmailChange}
            className={inputClasses(errorMessage)}
          />
        </div>
        <div className='flex flex-col items-start gap-1'>
          <label htmlFor='password' className='font-semibold text-gray-700'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
            className={inputClasses(errorMessage)}
          />
        </div>
        {errorMessage && (
          <p className='text-red-500 text-sm'>{errorMessage}</p>
        )}
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded-md w-full mt-4'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginFormComponent;

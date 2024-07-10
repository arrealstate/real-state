import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { RiUserFill } from 'react-icons/ri'; 
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };


  const [showSignUpPopup, setShowSignUpPopup] = useState(false);


  const openSignUpPopup = () => {
    setShowSignUpPopup(true);
  };

  const closeSignUpPopup = () => {
    setShowSignUpPopup(false);
  };

  const handleSignUpUser = () => {
    // Handle signup as user click
    // Redirect to the user signup page
    navigate('/sign-up');
  };

  const handleSignUpDeveloper = () => {
    // Handle signup as developer click
    // Redirect to the developer signup page
    navigate('/dev/sign-up');
  };

  const handleSignUpMicroDeveloper = () => {
    // Handle signup as microdeveloper click
    // Redirect to the microdeveloper signup page
    navigate('/microDev/sign-up');
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
    <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <span className='text-blue-700 cursor-pointer' onClick={openSignUpPopup}>
          Sign up
        </span>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}

      
 {/* Signup popup */}
 {showSignUpPopup && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white px-8 pb-8 pt-6 rounded-lg shadow-lg relative'>
            <button className='absolute top-4 right-4 text-gray-600 text-4xl' onClick={closeSignUpPopup}>
              &times;
            </button>
            <h1 className='text-3xl text-center font-semibold px-4 mb-9'>Sign Up</h1>

            <div className='flex flex-col px-2 pb-2 gap-4 justify-center'>

              <div className='signup-option flex items-center mx-6 border-2 border-black rounded p-4' onClick={handleSignUpUser}>
                <RiUserFill className='box-icon text-4xl mr-2' />
                <p className='items-center'> User</p>
              </div>
              <div className='signup-option flex items-center mx-6 border-2 border-black rounded p-4' onClick={handleSignUpDeveloper}>
                <FaHome className='box-icon text-4xl mr-2' />
                <p> Developer</p>
              </div>
              <div className='signup-option flex items-center mx-6 border-2 border-black rounded p-4' onClick={handleSignUpMicroDeveloper}>
                <IoIosPeople className='box-icon text-4xl mr-2' /> 
                <p> MicroDeveloper</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
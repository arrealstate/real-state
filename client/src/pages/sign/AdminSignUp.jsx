import react ,{ useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import OAuth from '../../components/OAuth';


export default function AdminSignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [developers, setDevelopers] = useState([]);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [users, setUsers] = useState([]);


    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('/api/user');
          if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
          }
    
          const data = await response.json();
    
          if (data.success) {
            setUsers(data.users);
            const developerUsers = data.users.filter(user => user.role === 'developer');
            setDevelopers(developerUsers);
            // console.log(developerUsers);
          } else {
            console.error('API Error:', data.message || 'Unknown error occurred');
          }
        } catch (error) {
          console.error('Error fetching users:', error.message);
        }
      };
    
      fetchUsers();
    }, []);
 
  const handleChange = (e) => {
    // console.log('Field ID:', e.target.id);
    // console.log('Field Value:', e.target.value);
  
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  
    if (e.target.id === 'role') {
      // console.log('Selected Role:', e.target.value);
      setSelectedRole(e.target.value);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log('Form Data on Submission:', formData);
      setLoading(true);
      const res = await fetch('/api/auth/adminsignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Admin Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <select
        id='role'
        onChange={handleChange}
        className='border p-3 rounded-lg'
        value={formData.role}
      >
        <option value='test' >
          Select Role
        </option>
        <option value='user'>User</option>
        <option value='developer'>Developer</option>
        <option value='microDeveloper'>Micro Developer</option>
        <option value='admin'>Admin</option>
      </select>

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
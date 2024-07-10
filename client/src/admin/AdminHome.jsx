import React , {useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';

function Home() {
  const [counts, setCounts] = useState({
    listings: 0,
    users: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [listingsRes, usersRes] = await Promise.all([
          fetch('/dashboard/listings/count'),
          fetch('/dashboard/users/count'),
        ]);

        const [
          dataListings,
          dataUsers,
        ] = await Promise.all([
          listingsRes.json(),
          usersRes.json(),
        ]);

        setCounts({
          listings: dataListings.count,
          users: dataUsers.count,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setCounts({
          ...counts,
          loading: false,
          error: 'Error fetching data. Please try again later.',
        });
      }
    }

    fetchData();
  }, []);
  return (
    <main className='main-container'>

      <Link to="/Admin" className="text-customBlue hover:underline">
        <div className='main-title text-black'>
          <h3>DASHBOARD</h3>
        </div>
      </Link>

      <div className='main-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Link to="/Admin/search?searchTerm=&type=all&parking=false&furnished=false&offer=false&sort=createdAt&order=desc" className="block p-4 bg-green-400 hover:bg-green-500 rounded-md">
          <div className=''>
            <div className='card-inner flex items-center'>
              <BsFillArchiveFill className='card_icon mr-2' />
              <h3 className='text-white'>PROPERTIES</h3>
            </div>
            <h1 className='text-white text-2xl font-bold'>
              
30              
              {/* {counts.listings} */}
              
              </h1>
          </div>
        </Link>

        <Link to="/Admin/Categories" className="block p-4 bg-blue-400 hover:bg-blue-500 rounded-md">
          <div className=''>
            <div className='card-inner flex items-center'>
              <BsFillGrid3X3GapFill className='card_icon mr-2' />
              <h3 className='text-white'>CATEGORIES</h3>
            </div>
            <h1 className='text-white text-2xl font-bold'>12</h1>
          </div>
        </Link>

        <Link to="/Admin/Users" className="block p-4 bg-orange-400 hover:bg-orange-500 rounded-md">
          <div className=''>
            <div className='card-inner flex items-center'>
              <BsPeopleFill className='card_icon mr-2' />
              <h3 className='text-white'>USERS</h3>
            </div>
            <h1 className='text-white text-2xl font-bold'>
36              
              {/* {counts.users} */}
              
              </h1>
          </div>
        </Link>

        <Link to="/Admin/Alerts" className="block p-4 bg-purple-400 hover:bg-purple-500 rounded-md">
          <div className=''>
            <div className='card-inner flex items-center'>
              <BsFillBellFill className='card_icon mr-2' />
              <h3 className='text-white'>ALERTS</h3>
            </div>
            <h1 className='text-white text-2xl font-bold'>42</h1>
          </div>
        </Link>
      </div>
    </main>
  );
}

export default Home;

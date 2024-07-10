import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ListingForDeveloper from './ListingDeveloper';

export default function DeveloperProfile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/edit-user/${id}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle errors or set an error state
      }
    };

    fetchUser();
  }, [id]);

  return (
    <main>
      {/* Existing code for profile */}
      {user ? (
        <div className=" mx-auto"  >


          {/* Top section with responsive height */}
          <div className="sm:h-30 bg-gray-300 h-32"></div>
          <div className="bg-white shadow-md -mt-20 p-4 text-center rounded-t-3xl">
            <div className="flex flex-col items-center">
              <div className="w-12 sm:w-10/12 md:w-4/6 lg:w-32 overflow-hidden rounded-full">
                {/* Adjust the width based on screen size */}
                <img src={user.avatar} alt="User Avatar" className="object-cover w-full h-full" />
              </div>
              <h1 className="text-xl font-bold mt-4">{user.username}</h1>
            </div>
          
          </div>



          <div className=" py-7 px-3">

  {/* Wrap each ListingForDeveloper component within a grid item */}
  <div className="sm:w-full gap-4">
    <ListingForDeveloper id={id} />
  </div>
</div>



</div>


      ) : (

        <main className="flex justify-center items-start min-h-screen py-7">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </main> 

        // <p>Loading...</p>
      )}
    </main>
  );
}


{/*           
          <div className='w-full flex max-w-fit ' >
          <ListingForDeveloper id={id} />
        </div>
        </div> */}
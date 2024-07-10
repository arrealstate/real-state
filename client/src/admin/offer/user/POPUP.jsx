import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function POPUP({ isOpen, toggleDropdown }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const popupRef = useRef(null);

  const closeDropdown = () => {
    toggleDropdown();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, toggleDropdown]);

  useEffect(() => {
    const fetchUsersWithOffers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/all/listings-with-user-offers');

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.users && Array.isArray(data.users)) {
          setUsers(data.users);
          // console.log(data.users);
        } else {
          throw new Error('Invalid or empty users data received');
        }
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchUsersWithOffers();
    }
  }, [isOpen]);

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div
            className="w-full max-w-screen-2xl bg-white border border-gray-300 rounded-md shadow-lg p-6 relative lg:mx-4 xl:mx-4"
            ref={popupRef}
            style={{ maxHeight:'90vh' , overflowY: 'auto' }}
          >
            <button
              onClick={closeDropdown}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Developers with Offers</h2>
            <div className="flex-1">
              {loading ? (

                  <main className="flex justify-center items-start min-h-screen py-7">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                    </div>
                  </main> 

                // <p>Loading...</p>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {users.map((developer) => (
                    <Link
                      to={`/DeveloperOfferProfile/developer?id=${developer._id}`}
                      className="hover:no-underline"
                      onClick={closeDropdown}
                      key={developer._id}
                    >
                      <li className="mb-4 flex items-center bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition duration-300">
                        <img
                          src={developer.avatar}
                          alt={`Avatar for ${developer.username}`}
                          className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-blue-500"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{developer.username}</h3>
                          <p className="text-gray-500">Role :     {`${developer.role.charAt(0).toUpperCase()}${developer.role.slice(1)}`}</p>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

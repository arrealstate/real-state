import React, { useEffect, useState } from 'react';

const ListingsWithOffers = ({ id }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListingsWithOffers = async () => {
      try {
        const response = await fetch(`/api/all/listings-with-non-empty-offers/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch listings: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setListings(data.listings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setError('Failed to fetch listings. Please try again.');
        setLoading(false);
      }
    };

    fetchListingsWithOffers();
  }, [userId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Listings with Offers</h2>
      {loading &&
                        <main className="flex justify-center items-start min-h-screen py-7">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                        </div>
                      </main> 
      
      
      // <p>Loading...</p>
      
      }
      {error && <p>{error}</p>}
      {listings.length > 0 && (
        <ul
        //  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {listings.map((listing) => (
            <li key={listing._id} className="mb-4 flex items-center bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition duration-300">
              <div>
              <p className="text-gray-500">  Offers</p>

                <h3 className="text-lg font-semibold">{listing.name}</h3>
                <p className="text-gray-500">{listing.offers.length} Offers</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListingsWithOffers;

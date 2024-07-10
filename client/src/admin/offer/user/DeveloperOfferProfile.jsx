import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ListingForDeveloper from './ListingFordevOffer';
// import ListingsWithOffers from './ListingsWithOffers'; // Import your component for displaying listings

export default function DeveloperOfferProfile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [developer, setDeveloper] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Don't make the API call if id is undefined
        if (!id) {
          setLoading(false);
          return;
        }
  
        const response = await fetch(`/api/all/listings-with-non-empty-offers/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} - ${response.statusText}`);
        }
  
        const data = await response.json();
        setDeveloper(data.developer);
        setListings(data.listings);
        setLoading(false);
        // console.log(data);
        // console.log(data.developer);
        // console.log(data.listings);
  
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again.');
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  











  return (
    <div>
      {loading && 
                        <main className="flex justify-center items-start min-h-screen py-7">
                        <div className="flex justify-center items-center">
                          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                        </div>
                      </main> 
      
      
      
      // <p>Loading...</p>
      
      }
      {error && <p>{error}</p>}
      {developer && (
        <div>
          <div className="sm:h-30 bg-gray-300 h-32"></div>
          <div className="bg-white shadow-md -mt-20 p-4 text-center rounded-lg">

            <div className="flex flex-col items-center">
  <div className="w-24 h-24 overflow-hidden rounded-full">
    <img src={developer.avatar} alt="User Avatar" className="object-cover w-full h-full" />
  </div>
  <h1 className="text-xl font-bold mt-4">{developer.username}</h1>

            </div>
          </div>

          <div className=" py-7 px-3">
          <div className="sm:w-full gap-4">

  <ListingForDeveloper userId ={id} developer = {developer} listings={listings} />

          {/* <div className="w-full flex max-w-fit">
            {/* Pass the user ID to the ListingsWithOffers component * /}
            <ListingForDeveloper userId ={id} developer = {developer} listings={listings} />
          </div> */}
        </div>
        </div>
        </div>

      )}
    </div>
  );
}

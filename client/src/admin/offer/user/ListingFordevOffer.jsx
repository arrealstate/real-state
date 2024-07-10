import React, { useEffect, useState } from 'react';
import ListingItem from './listingitmsoffers';

export default function ListingForDeveloper({ id , listings , developer}) {
  // const userId = id;
  // const [listings, setListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  return (
          <div>
            {!showListingsError && listings.length === 0 && (
              <p className="text-xl text-slate-700">No listings found!</p>
            )}
            {showListingsError && (

<main className="flex justify-center items-start min-h-screen py-7">
<div className="flex justify-center items-center">
  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
</div>
</main> 


              // <p className="text-xl text-slate-700 text-center w-full">Loading...</p>


            )}
                        <div className="flex flex-wrap gap-4 justify-center items-center">

            {/* <div className="py-7 flex flex-wrap"> */}
              {!showListingsError &&
                listings &&
                listings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} userId={id}  developer = {developer}/>
                ))}
            </div>
          </div>
  );
}

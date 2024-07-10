// import React, { useState } from 'react';

// const DisplayOffers = ({ allOffers, listing }) => {
//   const [showAllOffers, setShowAllOffers] = useState(false);

//   const toggleShowAllOffers = () => {
//     setShowAllOffers(!showAllOffers);
//   };

//   return (
//     <div>
//       {listing && listing.offers && listing.offers.length > 0 ? (
//         <main>
//           <div className="mt-2 flex">
//             <p className="text-gray-700 font-semibold flex-1">Code:</p>
//             <p className="text-gray-700 font-semibold flex-1">Description:</p>
//             <p className="text-gray-700 font-semibold flex-1">Discount Percentage:</p>
//           </div>

//           {Array.isArray(allOffers) && allOffers.length > 0 ? (
//             allOffers.map((offer, index) => (
//               <div key={index} className="mt-2 flex">
//                 <p className="text-gray-700 flex-1"> {offer?.code || 'N/A'}</p>
//                 <p className="text-gray-700 flex-1"> {offer?.description || 'N/A'}</p>
//                 <p className="text-gray-700 flex-1"> {offer?.discountPercentage || 'N/A'}</p>
//               </div>
//             ))
//           ) : (
//             <div className="py-8">
//               <p className="text-lg">No offers added</p>
//             </div>
//           )}

//           {Array.isArray(allOffers) && allOffers.length > 1 && (
//             <button
//               className="text-blue-500 font-semibold mt-2 focus:outline-none"
//               onClick={toggleShowAllOffers}
//             >
//               {showAllOffers ? 'Show Less' : 'Show More'}
//             </button>
//           )}
//         </main>
//       ) : (
//         <div className="py-8">
//           <p className="text-lg">No More Listings</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DisplayOffers;

import React, { useState, useEffect } from 'react';

const DisplayOffers = ({ allOffers, listing }) => {
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulating data fetching delay with setTimeout (Replace this with actual data fetching)
    const fetchData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1500); // Simulating loading for 1.5 seconds
    };
    fetchData();
  }, [allOffers, listing]);

  const toggleShowAllOffers = () => {
    setShowAllOffers(!showAllOffers);
  };

  const renderOffers = () => {
    if (loading) {
      return 
        //       <main className="flex justify-center items-start min-h-screen py-7">
        //   <div className="flex justify-center items-center">
        //     <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        //   </div>
        // </main>    
      
      
      <p>Loading...</p>;
    }

    if (!listing || !listing.offers || listing.offers.length === 0) {
      return (
        <div className="py-8">
          <p className="text-lg">No offers added</p>
        </div>
      );
    }

    return (
      <main>
        {showAllOffers
          ? allOffers.map((offer, index) => (
              <div key={index} className="mt-2 flex">
                <p className="text-gray-700 flex-1">{offer.code || 'N/A'}</p>
                <p className="text-gray-700 flex-1">{offer.description || 'N/A'}</p>
                <p className="text-gray-700 flex-1">{offer.discountPercentage || 'N/A'}</p>
              </div>
            ))
          : allOffers.slice(0, 1).map((offer, index) => (
              <div key={index} className="mt-2 flex">
                <p className="text-gray-700 flex-1">{offer.code || 'N/A'}</p>
                <p className="text-gray-700 flex-1">{offer.description || 'N/A'}</p>
                <p className="text-gray-700 flex-1">{offer.discountPercentage || 'N/A'}</p>
              </div>
            ))}
      </main>
    );
  };

  return (
    <div>
      {renderOffers()}

      {allOffers.length > 1 && (
        <button
          className="text-blue-500 font-semibold mt-2 focus:outline-none"
          onClick={toggleShowAllOffers}
        >
          {showAllOffers ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default DisplayOffers;

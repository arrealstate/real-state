// import React, { useEffect, useState } from 'react';
// import ListingItem from '../components/ListingItem';

// export default function ListingForDeveloper({ id }) {
//   const [listings, setListings] = useState([]);
//   const [showListingsError, setShowListingsError] = useState(false);
//   const [showMore, setShowMore] = useState(false);

//   useEffect(() => {
//     const handleShowListings = async () => {
//       try {
//         setShowListingsError(false);
//         const res = await fetch(`/api/user/developer-users-listing/${id}`);
//         const data = await res.json();
//         if (data.success === false) {
//           setShowListingsError(true);
//           return;
//         }
//         setListings(data);
//       } catch (error) {
//         setShowListingsError(true);
//       }
//     };

//     handleShowListings();
//   }, [id]);

//   // const onShowMoreClick = () => {
    
//   // };


//   return (
//     <div>
//       {/* Existing code for user profile */}
//       {/* Display user's listings */}
//       <div className="flex-1">
//         {/* <div className="p-7 flex flex-wrap gap-4"> */}
//       <div>
//         <div className="p-7 flex flex-wrap gap-4">
//         {showListingsError && (
//             <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
//           )}
//           {!showListingsError && listings.length === 0 && (
//             <p className="text-xl text-slate-700">No listing found!</p>
//           )}
         
//         <div className="py-7 flex flex-wrap gap-4">
//           {!showListingsError &&
//             listings &&
//             listings?.map((listing) => (
//               <ListingItem key={listing._id} listing={listing} />

//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//    </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import ListingItem from '../components/ListingItem';

// export default function ListingForDeveloper({ id }) {
//   const [listings, setListings] = useState([]);
//   const [showListingsError, setShowListingsError] = useState(false);
//   const [loading, setLoading] = useState(true); // State to manage loading status

//   useEffect(() => {
//     const handleShowListings = async () => {
//       try {
//         setShowListingsError(false);
//         // Simulating loading for 10 seconds
//         const timer = setTimeout(async () => {
//           const res = await fetch(`/api/user/developer-users-listing/${id}`);
//           const data = await res.json();
//           clearTimeout(timer);
//           setLoading(false);
//           if (data.success === false) {
//             setShowListingsError(true);
//             return;
//           }
//           setListings(data);
//         }, 10000);

//         // Clean up function to clear the timeout in case component unmounts before the 10 seconds
//         return () => clearTimeout(timer);
//       } catch (error) {
//         setShowListingsError(true);
//         setLoading(false);
//       }
//     };

//     handleShowListings();
//   }, [id]);

//   return (
//     <div>
//       {/* Display user's listings */}
//       <div className="flex-1">
//         <div className="p-7 flex flex-wrap gap-4">
//           {/* Show loading message if loading is true */}
//           {loading && <p className="text-xl text-slate-700 text-center w-full">Loading...</p>}
//           {/* If loading is false and listings array is empty, show "No listing found!" */}
//           {!loading && !showListingsError && listings.length === 0 && (
//             <p className="text-xl text-slate-700">No listing found!</p>
//           )}
//           {/* Render listings if loading is false and listings array is not empty */}
//           {!loading && !showListingsError && listings.length > 0 && (
//             <div className="py-7 flex flex-wrap gap-4">
//               {listings.map((listing) => (
//                 <ListingItem key={listing._id} listing={listing} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import ListingItem from '../components/ListingItem';

export default function ListingForDeveloper({ id }) {
  const [listings, setListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const handleShowListings = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch(`/api/user/developer-users-listing/${id}`);
        const data = await res.json();
        setLoading(false); // Set loading to false after fetching data
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }
        // Reverse the order of listings before setting it to state
        setListings(data.reverse());
      } catch (error) {
        setShowListingsError(true);
        setLoading(false); // Set loading to false if an error occurs
      }
    };
  
    handleShowListings();
  }, [id]);
  






  // useEffect(() => {
  //   const handleShowListings = async () => {
  //     try {
  //       setShowListingsError(false);
  //       const res = await fetch(`/api/user/developer-users-listing/${id}`);
  //       const data = await res.json();
  //       setLoading(false); // Set loading to false after fetching data
  //       if (data.success === false) {
  //         setShowListingsError(true);
  //         return;
  //       }
  //       setListings(data);
  //     } catch (error) {
  //       setShowListingsError(true);
  //       setLoading(false); // Set loading to false if an error occurs
  //     }
  //   };

  //   handleShowListings();
  // }, [id]);

  return (
    <div>
      {/* Display user's listings */}

      {/* If loading is true and listings array is empty, show "Loading..." */}
       {loading && listings.length === 0 && ( 
      <main className="flex justify-center items-center min-h-screen py-7">
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
</main>           )} 



            {/* <main className="flex justify-center items-center h-screen">
  <div className="flex justify-top items-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
</main>  */}






{/* If loading is true and listings array is empty, show "Loading..." */}
{/* <div className="flex min-h-screen items-center justify-center">
    <div className="w-1/3">
        <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
        <div className="h-48 bg-gray-300"></div>
        <div className="px-6 py-4">
            <div className="h-6 bg-gray-300 mb-2"></div>
            <div className="h-4 bg-gray-300 w-2/3"></div>
        </div>
        <div className="px-6 pt-4 pb-2">
            <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 w-1/2"></div>
        </div>
        </div>
    </div>
</div> */}



{/* 
{loading && listings.length === 0 && (
  <div className="fixed top-0 left-0 w-full flex justify-center">
    <div className="absolute top-1/2 transform -translate-y-1/2">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  </div>
)} */}
{/* 
  {loading && listings.length > 0 && (
    <div className="flex justify-center ">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  )} */}

   
      {/* className="flex-1" */}

      {/* className="p-4" */}
       
       
        {/* <div  

        > */}
 




          {/* If loading is false and listings array is not empty, render listings */}
          {!loading && !showListingsError && listings.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          )}
          {/* If loading is false and listings array is empty, show "No listing found!" */}
          {!loading && !showListingsError && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {/* If there's an error, show error message */}
          {showListingsError && (
            <p className="text-xl text-slate-700"> NO INTERNET CONNECTION ! </p>
          )}
        </div>
       
  );
}

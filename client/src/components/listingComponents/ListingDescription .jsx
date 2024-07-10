import React, { useState } from 'react';

const ListingDescription = ({ description }) => {
  const [showMore, setShowMore] = useState(false);

  // Function to toggle show/hide of extra lines
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Splitting the description by lines
  const descriptionLines = description.split('\n');

  // Display only the first two lines or all lines based on the state
  const displayDescription = showMore ? description : descriptionLines.slice(0, 2).join('\n');

  return (
    <div>
      <p className='text-slate-800'>
        <span className='font-semibold text-black'>Description : </span>
        {displayDescription}
      </p>
      {/* Show toggle button if there are more than 2 lines */}
      {descriptionLines.length > 2 && (
        <button onClick={toggleShowMore} className='text-blue-800 cursor-pointer'>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default ListingDescription;

import React, { useState, useEffect } from 'react';
import POPUP from "../../admin/offer/user/POPUP";


const ArOffersButton = () => {
  const [currentColor, setCurrentColor] = useState('bg-yellow-400');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const colors = ['bg-yellow-400', 'bg-yellow-500', 'bg-yellow-600', 'bg-yellow-700'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      setCurrentColor(randomColor);
    }, 2000);

    return () => clearInterval(colorInterval);
  }, []);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  const toggleDropdown = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      {/* <button
        onClick={handleButtonClick}
        className={`px-6 py-2 rounded-full font-bold text-white transition duration-300 ${currentColor} items-center`}
      >
        AR Offers
      </button> */}
        {/* <button
      onClick={handleButtonClick}
      className={`px-3 sm:px-6 py-2 rounded-full font-bold text-white transition duration-300 ${currentColor} items-center`}
    >
      <span className="hidden sm:inline-block">AR {' '}</span>Offers
    </button> */}
<button
  onClick={handleButtonClick}
  className={`px-3 sm:px-6 py-2 rounded-full font-bold text-white transition duration-300 ${currentColor} items-center`}
>
  <span className="hidden sm:inline-block" style={{ whiteSpace: 'nowrap' }}>AR</span>
  <span className="hidden md:inline-block sm:hidden" style={{ whiteSpace: 'nowrap' }}> -</span> 
  Offers
</button>




      <POPUP isOpen={isModalOpen} toggleDropdown={toggleDropdown} onClose={handleCloseModal} /> {/* Render the Modal */}
    </>
  );
};

export default ArOffersButton;

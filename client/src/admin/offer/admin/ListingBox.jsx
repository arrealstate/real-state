// components/Admin/Offers/ListingBox.jsx
import React, { useState, useEffect } from 'react';
import DisplayOffers from './DisplayOffers';
import OfferPOPUP from './OfferPOPUP';

const ListingBox = ({
  listing,
  onAddOffer,
  onUpdateOffer,
  onRemoveOffer,
  onSelectListing,
}) => {
  const [popupMode, setPopupMode] = useState(null);

  const handleButtonClick = (mode) => {
    setPopupMode(mode);
    // Pass the selected listing ID to the parent component
    onSelectListing(listing._id);
  };

  const handleClosePopup = () => {
    setPopupMode(null);
  };

  const [allOffers, setAllOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      if (listing && listing.offers && listing.offers.length > 0) {
        const offersData = [];

        for (const offerId of listing.offers) {
          try {
            const response = await fetch(`/api/offer/offers/${offerId}`);
            if (response.ok) {
              const offerDetails = await response.json();
              offersData.push(offerDetails);
            } else {
              console.error('Failed to fetch offer details');
            }
          } catch (error) {
            console.error('Error fetching offer details:', error);
          }
        }

        setAllOffers(offersData);
      }
    };

    fetchOffers();
  }, [listing.offers]);

  // You can customize the styling below to match your design preferences
  return (
    <div className="flex flex-col rounded-md overflow-hidden shadow-md bg-white" style={{ minHeight: '350px' }}>
      <img
        className="w-full h-48 object-cover"
        src={listing.imageUrls[0]}
        alt={listing.name}
      />
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-semibold mb-2">{listing.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{listing.description}</p>

        <DisplayOffers allOffers={allOffers} listing={listing} />
      </div>

      {/* Buttons at the bottom */}
      <div className="flex justify-between p-4">
        <div className="flex space-x-4 w-full">
          <button
            onClick={() => handleButtonClick('add')}
            className="flex-1 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-sm"
          >
            Add
          </button>
          <button
            onClick={() => handleButtonClick('update')}
            className="flex-1 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
          >
            Update
          </button>
        <button
          onClick={() => handleButtonClick('remove')}
          className="flex-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
        >
          Remove
        </button>
        </div>

      </div>

      {/* Display the OfferPOPUP component based on the selected mode */}
      {popupMode && (
        <OfferPOPUP
          mode={popupMode}
          offers={allOffers}
          setShowPopup={handleClosePopup}
          selectedListing={listing}
          setOffers={setAllOffers}
          handleAddOffer={onAddOffer}
          handleUpdateOffer={onUpdateOffer}
          handleRemoveOffer={onRemoveOffer}
        />
      )}
    </div>
  );
};

export default ListingBox;


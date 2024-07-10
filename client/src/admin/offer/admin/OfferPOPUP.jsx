import React, { useState, useEffect } from 'react';

const OfferPopup = ({
  mode,
  offers,
  setShowPopup,
  selectedListing,
  setOffers,
}) => {
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [allOffers, setAllOffers] = useState([]);

  useEffect(() => {
    fetchAllOffers();
  }, []);

  const fetchAllOffers = async () => {
    try {
      const response = await fetch('/api/offer/offers');
      if (response.ok) {
        const fetchedOffers = await response.json();
        setAllOffers(fetchedOffers);
      } else {
        console.error('Failed to fetch all offers');
      }
    } catch (error) {
      console.error('Error fetching all offers:', error);
    }
  };

  const handleSelectOffer = (offerId) => {
    setSelectedOffers((prevSelectedOffers) => {
      const isSelected = prevSelectedOffers.includes(offerId);

      if (isSelected) {
        return prevSelectedOffers.filter((id) => id !== offerId);
      } else {
        return [...prevSelectedOffers, offerId];
      }
    });
  };

  const handleAddOrUpdateOffer = async () => {
    const url = '/api/offer/update-offer';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingId: selectedListing._id,
          offerIds: selectedOffers,
          action: mode === 'add' ? 'add' : 'update',
        }),
      });

      if (response.ok) {
        const updatedOffers = await response.json();
        setOffers(updatedOffers);
        fetchAllOffers();
        handleClosePopup();
      } else {
        console.error(mode === 'add' ? 'Failed to add offer' : 'Failed to update offer');
      }
    } catch (error) {
      console.error(mode === 'add' ? 'Error adding offer:' : 'Error updating offer:', error);
    }
  };

  const handleRemoveSpecificOffer = async () => {
    // Assuming you want to remove all selected offers from the listing
    const url = `/api/offer/${selectedListing._id}/offers`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offerIds: selectedOffers,
        }),
      });

      if (response.ok) {
        const updatedOffers = await response.json();
        setOffers(updatedOffers);
        fetchAllOffers();
        handleClosePopup();
      } else {
        console.error('Failed to remove selected offers from the listing');
      }
    } catch (error) {
      console.error('Error removing selected offers:', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedOffers([]);
  };

  return (
    <div className="popup-overlay p-2">
      <div className="popup-container">
        <h2 className="text-lg font-semibold mb-4">
          {mode === 'add' ? 'Add Offer' : mode === 'update' ? 'Update Offer' : 'Remove Offer'}
        </h2>

        {allOffers.map((offer) => (
          <div key={offer._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedOffers.includes(offer._id)}
              onChange={() => handleSelectOffer(offer._id)}
              className="mr-2"
            />
            <span>{offer.code}</span>
          </div>
        ))}

        <div className="flex justify-between mt-4">
          {mode !== 'remove' && (
            <button
              onClick={handleAddOrUpdateOffer}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {mode === 'add' ? 'Add Selected' : 'Update Selected'}
            </button>
          )}

          {mode === 'remove' && (
            <button
              onClick={handleRemoveSpecificOffer}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove Selected
            </button>
          )}

          <button
            onClick={handleClosePopup}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;

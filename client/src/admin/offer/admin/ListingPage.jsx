// components/Admin/Offers/ListingPage.jsx
import React from 'react';
import ListingBox from './ListingBox';
import OfferPOPUP from './OfferPOPUP';
import DisplayOffers from './DisplayOffers';
import { useOfferFunctions } from './offerFunctions';

const ListingPage = () => {
  const {
    listings,
    offers,
    selectedListing,
    showPopup,
    showUpdatePopup,
    successMessage,
    handleAddOffer,
    handleUpdateOffer,
    handleRemoveOffer,
    handleSelectOffer,
    handleSelectListing,
    setSuccessMessage,
    setOffers,
    setListings,
    setShowPopup,
    setShowUpdatePopup,
  } = useOfferFunctions();

  return (
    <div className="w-full">
      <div className="m-2">
        <h1 className="m-6 text-2xl font-semibold mb-4 justify-center items-center">
          Listing Page
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 gap-4">
          {Array.isArray(listings) && listings.length > 0 ? (
            listings.map((listing) => (
              <ListingBox
                key={listing._id}
                listing={listing}
                offers={offers}
                setOffers={setOffers}
                setListings={setListings}
                onSelectListing={handleSelectListing}
                onAddOffer={handleAddOffer}
                onUpdateOffer={handleUpdateOffer}
                onRemoveOffer={handleRemoveOffer}
                showUpdatePopup={showUpdatePopup}
                setShowUpdatePopup={setShowUpdatePopup}
              />
            ))
          ) : (
            <p>No listings available</p>
          )}

          {/* OfferPopup component */}
          {showPopup && selectedListing && (
            <OfferPOPUP
              offers={offers}
              handleAddOffer={handleAddOffer}
              handleUpdateOffer={handleUpdateOffer}
              setShowPopup={setShowPopup}
              selectedListing={selectedListing}
              handleSelectOffer={handleSelectOffer}
            />
          )}

          {/* DisplayOffers component */}
          <DisplayOffers allOffers={offers} />

          {/* Success message display */}
          {successMessage && (
            <div className="bg-green-500 text-white px-4 py-2 rounded absolute bottom-4 right-4 z-50">
              <p>{successMessage}</p>
              <button
                onClick={() => setSuccessMessage('')}
                className="mt-2 bg-white text-green-500 px-4 py-1 rounded hover:bg-gray-200"
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingPage;

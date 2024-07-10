// offerFunctions.jsx
import { useState, useEffect } from 'react';

export const useOfferFunctions = () => {
  const [listings, setListings] = useState([]);
  const [offers, setOffers] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsResponse = await fetch('/api/list/listings');
        if (!listingsResponse.ok) {
          throw new Error('Failed to fetch listings');
        }
        const listingsData = await listingsResponse.json();
        setListings(Array.isArray(listingsData) ? listingsData : []);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      }

      try {
        const offersResponse = await fetch('/api/offer/offers');
        if (!offersResponse.ok) {
          throw new Error('Failed to fetch offers');
        }
        const offersData = await offersResponse.json();
        setOffers(Array.isArray(offersData) ? offersData : []);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setOffers([]);
      }
    };

    fetchListings();
  }, []);

  const handleSelectOffer = () => {
    console.log('handleSelectOffer');
  };

  const handleSelectListing = () => {
    console.log('handleSelectListing');
  };

  const onUpdateOffer = () => {
    console.log('onUpdateOffer');
  };

  const handleAddOffer = (listingItem) => {
    setSelectedListing(listingItem);
    setShowPopup(true);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setSuccessMessage('');
    }, 5000); // Display for 5 seconds
  };

  return {
    listings,
    offers,
    selectedListing,
    showPopup,
    setShowPopup,
    showUpdatePopup,
    setShowUpdatePopup,
    successMessage,
    handleAddOffer,
    setOffers,
    setListings,
    handleSelectOffer,
    handleSelectListing,
    onUpdateOffer,
  };
};

// ListingService.js

import axios from 'axios';

const API_BASE_URL = '/api/list';

const ListingService = {
  // Get all listings
  getAllListings: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get`);
      return response.data;
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw new Error('Failed to fetch listings');
    }
  },

  // Get a listing by ID
  getListingById: async (listingId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${listingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching listing:', error);
      throw new Error('Failed to fetch listing');
    }
  },

  // Create a new listing
  createListing: async (listingData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, listingData);
      return response.data;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw new Error('Failed to create listing');
    }
  },

  // Update a listing by ID
  updateListingById: async (listingId, listingData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update/${listingId}`, listingData);
      return response.data;
    } catch (error) {
      console.error('Error updating listing:', error);
      throw new Error('Failed to update listing');
    }
  },

  // Delete a listing by ID
  deleteListingById: async (listingId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${listingId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting listing:', error);
      throw new Error('Failed to delete listing');
    }
  },

  linkOfferToListing: async (listingId, offerId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/linkOffer/${listingId}`, { offerId });
      return response.data;
    } catch (error) {
      console.error('Error linking offer to listing:', error);
      throw new Error('Failed to link offer to listing');
    }
  },
};

export default ListingService;

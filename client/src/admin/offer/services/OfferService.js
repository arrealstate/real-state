// OfferService.js

import axios from 'axios';

const API_BASE_URL = '/api/offer/offers';

const OfferService = {
  getAllOffers: async () => {
    return await axios.get(API_BASE_URL);
  },

  createOffer: async (offerData) => {
    return await axios.post(API_BASE_URL, offerData);
  },

  getOfferById: async (offerId) => {
    return await axios.get(`${API_BASE_URL}/${offerId}`);
  },

  updateOffer: async (offerId, offerData) => {
    return await axios.put(`${API_BASE_URL}/${offerId}`, offerData);
  },

  deleteOffer: async (offerId) => {
    return await axios.delete(`${API_BASE_URL}/${offerId}`);
  },
};

export default OfferService;

import express from 'express';
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
  linkOfferToListing,
  updateListingOffers,
  deleteOfferFromListing,
  getOffersForListing , 
  addOfferToListing,
  getAllOwners,
  getAllUserRefs,
  getAllUserRefswithOffers
} from '../controllers/listingwithouttoken.controller.js';

const router = express.Router();

// Create a new listing
router.post('/listing', createListing);

// Delete a listing by ID
router.delete('/listing/:id', deleteListing);

// Update a listing by ID
router.put('/listing/:id', updateListing);

// Get a single listing by ID
router.get('/listing/:id', getListing);

// Get all listings
router.get('/listings', getListings);

// Link an offer to a listing by listing ID
router.put('/listing/:listingId/link-offer/:offerId', linkOfferToListing);

// Update a listing by adding or removing offers
router.put('/listing/:listingId/offers', updateListingOffers);

// Delete an offer from a listing by ID
router.delete('/listing/:listingId/offers/:offerId', deleteOfferFromListing);

// New route to get all offers for a specific listing
router.get('/listing/:listingId/offers', getOffersForListing);


router.post('/listings/:listingId/offers/:offerId', addOfferToListing);

router.get('/listing/:listingId/offers', getOffersForListing);
router.get('/getAllOwners', getAllOwners);
router.get('/getAllUserRefs', getAllUserRefs);

router.get('/getAllUserRefswithOffers', getAllUserRefswithOffers);


export default router;
// app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/listing', listingRouter);
// app.use('/api/offer', offerRouter);
// app.use('/api/list', listingwithouttoken);
// app.use('/api/dashboard', dashboardRoute);
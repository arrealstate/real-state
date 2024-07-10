import express from 'express';
import {getOffersForListing, offerController ,
    
    updateOfferInListing , removeAllOffersFromListing , removeSpecificOfferFromListing ,

    linkListingWithOffer , removeOfferFromListing} from '../controllers/offer.controller.js';

const router = express.Router();

// Define routes for offers using the offerController object
router.get('/offers', offerController.getAllOffers);
router.post('/offers', offerController.createOffer);
router.get('/offers/:offerId', offerController.getOfferById);
router.put('/offers/:offerId', offerController.updateOffer);
router.delete('/offers/:offerId', offerController.deleteOffer);


router.put('/offers/:offerId/link-listing/:listingId', linkListingWithOffer);
router.get('/listings/:listingId/offers', getOffersForListing);





// Update or add an offer to a listing
router.post('/update-offer', updateOfferInListing);
// Remove all offers from a listing
router.post('/:listingId/offers/remove-all', removeAllOffersFromListing);
// Remove a specific offer from a listing
router.delete('/:listingId/offers/:offerId', removeSpecificOfferFromListing);

///

router.delete('/:listingId/offers', removeOfferFromListing);
// // Update or add offers to a listing
// router.post('/update-offer', offerController.updateOrAddOffer);

// // Remove specific offers from a listing
// router.delete('/:listingId/offers', offerController.removeSpecificOffers);

export default router;


// app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/listing', listingRouter);
// app.use('/api/offer', offerRouter);
// app.use('/api/list', listingwithouttoken);
// app.use('/api/dashboard', dashboardRoute);

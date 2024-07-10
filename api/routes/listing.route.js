import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings ,
     getListingsByUserId ,linkOfferToListing , getLastAddedListings
     , deleteAllListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);

router.post('/update/:id', verifyToken, updateListing); 

router.get('/get/:id', getListing);
router.get('/get', getListings);
router.get('/getListingsByUserId/:userId', getListingsByUserId);
router.put('/:listingId/link-offer/:offerId', linkOfferToListing);
router.get('/last-added', getLastAddedListings);
router.delete('/deleteAlllistings', deleteAllListings);

export default router;
// app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/listing', listingRouter);
// app.use('/api/offer', offerRouter);
// app.use('/api/list', listingwithouttoken);
// app.use('/api/dashboard', dashboardRoute);

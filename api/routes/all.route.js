// all.routes.js
import express from 'express';
import { deleteAll , updateUserColor , getAllData , getUsersWithOffers , getListingsWithNonEmptyOffersForDeveloper , getListingsWithEmptyOffersForDeveloper } from '../controllers/all.controller.js';

const router = express.Router();

router.get('/', getAllData);

router.put('/:userId/color', updateUserColor);

router.get('/listings-with-user-offers', getUsersWithOffers);
router.get('/listings-with-non-empty-offers/:developerId', getListingsWithNonEmptyOffersForDeveloper);
router.get('/listings-with-empty-offers/:developerId', getListingsWithEmptyOffersForDeveloper);
// router.delete('/deleteAll', deleteAll);



export default router;

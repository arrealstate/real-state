import express from 'express';
import { verifyToken, verifyNoToken , accessForAll, accessForAdmin} from '../utils/verifyUser.js';
import { getUsersWithOffers ,
     getOffersForUser,
      getListingsByUserId,
       getDevelopers, getUserById, 
       getDeveloperUsers, deleteUser, test, updateUser, getUserListings, 
       getUser, getAllUsers, updateUserAdmin, deleteUserAdmin , getAllUsersWithListings , getAllUserss , getUserIds
       
// getAllUsersAndListings,

        
        // getAllUsersListings ,
       
    //    getAllUsersWithOffers ,
    //    getAllUsersWithOffersAll

    } from '../controllers/user.controller.js';



const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);
router.get('/', getAllUsers);
router.post('/admin/edit-user/:id', updateUserAdmin);
router.get('/edit-user/:id', getUser);
router.get('/developer/:id', getUserById);
router.get('/developerlisting/:id', getUserListings);

router.delete('/edit-user/delete/:id', deleteUserAdmin);
router.get('/edit-user/listings/:id', accessForAdmin, getUserListings);
router.get('/developers',accessForAll, getDevelopers);
router.get('/developer-users', verifyNoToken , getDeveloperUsers);


router.get('/developer-users-listing/:id', getListingsByUserId);
router.get('/getOffersForUser/:id', getOffersForUser);

router.get('/users-with-offers', verifyToken, getUsersWithOffers);
router.get('/getAllUsersWithListings', verifyNoToken ,getAllUsersWithListings);

router.get('/getAllUserss', getAllUserss);
router.get('/getUserIds', getUserIds);



// router.get('/usersWithOffers', verifyNoToken , getUsersWithOffers);

// router.get('/getAllUsersWithOffers', verifyNoToken , getAllUsersWithOffers);

// router.get('/getAllUsersWithOffersAll',  getAllUsersWithOffersAll);

// router.get('/getAllUsersAndListings ', getAllUsersAndListings.getAllUsersAndListings );
// router.get('/getAllUsersListings',  getAllUsersListings);


export default router;
// app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/listing', listingRouter);
// app.use('/api/offer', offerRouter);
// app.use('/api/list', listingwithouttoken);
// app.use('/api/dashboard', dashboardRoute);

// /api/user/getAllUsersWithOffersAll

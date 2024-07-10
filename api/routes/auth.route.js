import express from 'express';
import { google, signOut, signin, signup , adminsignup , microdevelopersignup , developersignup } from '../controllers/auth.controller.js';

const router = express.Router();



router.post("/developerssignup", developersignup);
router.post("/microdevelopersignup", microdevelopersignup);
router.post("/adminsignup", adminsignup);

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google', google);
router.get('/signout', signOut)

export default router;
// app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/listing', listingRouter);
// app.use('/api/offer', offerRouter);
// app.use('/api/list', listingwithouttoken);
// app.use('/api/dashboard', dashboardRoute);

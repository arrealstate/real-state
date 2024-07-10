import express from 'express';
import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';
const router = express.Router();

// Route to get the count of listings
router.get('/listings/count', async (req, res) => {
  try {
    const count = await Listing.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get the count of users
router.get('/users/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
// app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/listing', listingRouter);
// app.use('/api/offer', offerRouter);
// app.use('/api/list', listingwithouttoken);
// app.use('/api/dashboard', dashboardRoute);

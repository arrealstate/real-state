// developersWithOffersController.js

import AROffer from '../models/AROffer'; // Import your AROffer model
import User from '../models/User'; // Import your User model

// Controller function to get developers with offers
const getDevelopersWithOffers = async (req, res) => {
  try {
    // Fetch all AROffer documents that have offers
    const offersWithDevelopers = await AROffer.find().populate('offers', 'userRef');

    // Extract unique user IDs from AROffer documents
    const userIds = new Set();
    offersWithDevelopers.forEach((offer) => {
      offer.offers.forEach((o) => {
        userIds.add(o.userRef);
      });
    });

    // Fetch users based on the extracted unique user IDs
    const developersWithOffers = await User.find({ _id: { $in: Array.from(userIds) } });

    res.status(200).json(developersWithOffers);
  } catch (error) {
    console.error('Error fetching developers with offers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { getDevelopersWithOffers };

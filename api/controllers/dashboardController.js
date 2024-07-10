import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';

// Controller function to get the count of listings
export const getListingsCount = async (req, res) => {
  try {
    const count = await Listing.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get the count of users
export const getUsersCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


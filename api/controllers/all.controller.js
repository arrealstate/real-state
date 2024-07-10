import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';
import AROffer from '../models/arOffer.model.js';


// Controller to get all listings, offers, and users
export const getAllData = async (req, res, next) => {
  try {
    // Fetch all listings, offers, and users from the database
    const allListings = await Listing.find();
    const allOffers = await AROffer.find();
    const allUsers = await User.find();

    // Combine the data into a single response
    const combinedData = {
      listings: allListings,
      offers: allOffers,
      users: allUsers,
    };

    // Send the combined data as a JSON response
    res.status(200).json(combinedData);
  } catch (error) {
    // Handle errors
    next(error);
  }
};


export const getUsersWithOffers = async (req, res) => {
    try {
        // Find distinct userRefs from listings with offers
        const distinctUserRefs = await Listing.distinct('userRef', { 'offers.0': { $exists: true } });

        // Retrieve users with the specified fields
        const users = await User.find({ _id: { $in: distinctUserRefs } }, 'username avatar role');

        res.json({ users });
    } catch (error) {
        console.error('Error fetching users with offers:', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};
  
export const getListingsWithNonEmptyOffersForDeveloper = async (req, res) => {
    const { developerId } = req.params;
  
    try {
      // Check if developerId is undefined
      if (!developerId) {
        return res.status(400).json({ error: 'Developer ID is undefined' });
      }
  
      // Find the developer by ID
      const developer = await User.findById(developerId);
  
      if (!developer) {
        return res.status(404).json({ error: 'Developer not found' });
      }
  
      // Find listings with non-empty offers for the developer
      const listings = await Listing.find({
        userRef: developerId,
        'offers.0': { $exists: true },
      });
  
      res.json({ developer, listings });
    } catch (error) {
      console.error('Error fetching listings with non-empty offers:', error);
      res.status(500).json({ error: 'Failed to retrieve listings' });
    }
  };
  
  export const getListingsWithEmptyOffersForDeveloper = async (req, res) => {
    const { developerId } = req.params;
  
    try {
      // Check if developerId is undefined
      if (!developerId) {
        return res.status(400).json({ error: 'Developer ID is undefined' });
      }
  
      // Find the developer by ID
      const developer = await User.findById(developerId);
  
      if (!developer) {
        return res.status(404).json({ error: 'Developer not found' });
      }
  
      // Find listings with non-empty offers for the developer
      const listings = await Listing.find({
        userRef: developerId,
        'offers.0': { $exists: false },
      });
  
      res.json({ developer, listings });
    } catch (error) {
      console.error('Error fetching listings with non-empty offers:', error);
      res.status(500).json({ error: 'Failed to retrieve listings' });
    }
  };

  // export const updateUserColor = async (req, res) => {
  //   try {
  //     const userId = req.params.userId; // Get the user ID from the request params
  //     const { color } = req.body; // Assuming the new color is sent in the request body
  
  //     const user = await User.findById(userId);
  
  //     if (!user) {
  //       return res.status(404).json({ success: false, error: 'User not found.' });
  //     }
  
  //     user.color = color;
  //     await user.save();
  
  //     res.status(200).json({ success: true, message: 'User color updated successfully.' });
  //   } catch (error) {
  //     console.error('Error updating user color:', error);
  //     res.status(500).json({ success: false, error: 'Failed to update user color.' });
  //   }
  // };
  
  export const updateUserColor = async (req, res) => {
    try {
      const userId = req.params.userId; // Get the user ID from the request params
      const { color, bgColor } = req.body; // Extract color and bgColor from the request body
    
      const user = await User.findById(userId);
    
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found.' });
      }
    
      user.color = color || user.color; // Update color if provided, else keep the existing color
      user.bgColor = bgColor || user.bgColor; // Update bgColor if provided, else keep the existing bgColor
      await user.save();
    
      res.status(200).json({ success: true, message: 'User color updated successfully.' });
    } catch (error) {
      console.error('Error updating user color:', error);
      res.status(500).json({ success: false, error: 'Failed to update user color.' });
    }
  };
  

  export const deleteAll = async (req, res) => {
  try {
      // Delete all listings
      await Listing.deleteMany({});

      // Delete all offers
      await AROffer.deleteMany({});

    // Delete all users except admin
    await User.deleteMany({ role: { $ne: 'admin' } });

    return res.status(200).json({ message: 'All listings, offers, and non-admin users deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

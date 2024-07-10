import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';
import AROffer from '../models/arOffer.model.js';




export const test = (req, res) => {
  res.json({
    message: 'Api route is working in test!',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};

export const getListingsByUserId = async (req, res, next) => {
  try {
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};


export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id; 

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      // If the user is not found, return a 404 error
      return res.status(404).json({ success: false, message: 'User not found!' });
    }

    // Omit the password field from the user data before sending it in the response
    const { password, ...userData } = user.toObject();

    res.status(200).json({ success: true, user: userData });
  } catch (error) {
    // If an error occurs during the process, pass it to the error handling middleware
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    // Extract query parameters from request
    const { role, limit } = req.query;
    let queryOptions = {};
    let limitResults = null;

    // Filter by role if it's provided
    if (role) {
      queryOptions.role = role;
    }

    // Limit results if limit is provided and is a number
    if (limit && !isNaN(limit)) {
      limitResults = parseInt(limit, 10);
    }

    // Construct the query, optionally adding limit if specified
    const query = User.find(queryOptions, 'username email role createdAt _id avatar listings');
    if (limitResults) {
      query.limit(limitResults);
    }

    // Execute the query and send back the users
    const users = await query;
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};






export const getDeveloperUsers = async (req, res, next) => {
  try {
    // Use the User model to find users with the role field set to "developer"
    const developerUsers = await User.find({ role: 'developer' }, 'username email role createdAt _id avatar');

    // Send the retrieved users in the response
    res.status(200).json(developerUsers);
  } catch (error) {
    // If an error occurs during the database operation, pass the error to the error handling middleware
    next(error);
  }
};

export const getDevelopers = async (req, res, next) => {
  try {
    const query = { role: 'developer' }; 
    
    const developers = await User.find(query)
      .select('username email role createdAt _id avatar')
      .limit(6) 
      .exec();

    res.status(200).json(developers);
  } catch (error) {
    next(error);
  }
};


export const updateUserAdmin = async (req, res, next) => {
  try {
    // Ensure only admin users can access this route
    if (!req.user || req.user.role !== 'admin') {
      return next(new errorHandler(403, 'Access denied. Only admins can update user accounts.'));
    }

    // Your existing logic for updating the user account
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUserAdmin = async (req, res, next) => {
  try {
    // Ensure only admin users can access this route
    if (!req.user || req.user.role !== 'admin') {
      return next(new errorHandler(403, 'Access denied. Only admins can delete user accounts.'));
    }

    // Your existing logic for deleting the user account
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};


export const getOffersForUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const offers = user.offers; 

    res.json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const getUsersWithOffers = async (req, res, next) => {
  try {
    const usersWithOffers = await User.find({
      'listings.offers': { $exists: true, $ne: [] }
    })
    .select('username email role createdAt _id avatar listings');

    res.status(200).json(usersWithOffers);
  } catch (error) {
    next(error);
  }
};


export const getAllUsersWithListings = async (req, res) => {
  try {
    const usersWithListings = await User.find({})
      .populate('listings') // Populate the 'listings' field
      .exec();

    res.status(200).json(usersWithListings);
  } catch (error) {
    console.error('Error fetching users with listings:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
export const getAllUserss = async (req, res, next) => {
  try {
    // Extract query parameters from request
    const { role, limit } = req.query;
    let queryOptions = {};
    let limitResults = null;

    // Filter by role if it's provided
    if (role) {
      queryOptions.role = role;
    }

    // Limit results if limit is provided and is a number
    if (limit && !isNaN(limit)) {
      limitResults = parseInt(limit, 10);
    }

    // Construct the query, optionally adding limit if specified
    const query = User.find(queryOptions, 'username email role createdAt _id avatar');
    if (limitResults) {
      query.limit(limitResults);
    }

    // Execute the query and send back the users
    const users = await query;
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserIds = async (req, res) => {
  try {
    const userList = []; // Replace this with your actual array of user objects
    const userIds = userList.map(user => user.id);

    res.json({ userIds });
  } catch (error) {
    console.error('Error retrieving user IDs:', error);
    res.status(500).json({ error: 'Failed to retrieve user IDs' });
  }
};
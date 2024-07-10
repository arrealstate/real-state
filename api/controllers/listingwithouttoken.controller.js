import Listing from '../models/listing.model.js';
import AROffer from "../models/arOffer.model.js";
import { Types } from 'mongoose';
import { errorHandler } from '../utils/error.js';





// Create a new listing
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// Delete a listing by ID
export const deleteListing = async (req, res, next) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);

    if (!deletedListing) {
      return next(errorHandler(404, 'Listing not found!'));
    }

    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Update a listing by ID
export const updateListing = async (req, res, next) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Returns the updated listing
    );

    if (!updatedListing) {
      return next(errorHandler(404, 'Listing not found!'));
    }

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

// Get a single listing by ID
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// Get all listings
export const getListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};


// Link an offer to a listing by listing ID
export const linkOfferToListing = async (req, res) => {
  const { listingId } = req.params;
  const { offerId } = req.body;

  // Check if offerId is a valid ObjectId
  if (!Types.ObjectId.isValid(offerId)) {
    return res.status(400).json({ error: 'Invalid offerId' });
  }

  try {
    const listing = await Listing.findByIdAndUpdate(
      listingId,
      { $push: { AROffer: Types.ObjectId(offerId) } }, // Convert offerId to ObjectId
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    return res.status(200).json({ message: 'Offer linked to listing successfully', listing });
  } catch (error) {
    console.error('Error linking offer to listing:', error);
    return res.status(500).json({ error: 'Failed to link offer to listing' });
  }
};

export const updateListingOffers = async (req, res) => {
  const { listingId } = req.params;
  const { offerId, action } = req.body;

  try {
    let listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    if (action === 'add') {
      if (!listing.offers.includes(offerId)) {
        // Convert offerId to ObjectId and push to the offers array
        listing.offers.push(Types.ObjectId(offerId));
        await listing.save();
      }
    } else if (action === 'remove') {
      // Ensure comparison is done as strings to remove the correct offer
      listing.offers = listing.offers.filter((id) => id.toString() !== offerId.toString());
      await listing.save();
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    return res.status(200).json({ message: 'Offer updated in the listing', listing });
  } catch (error) {
    console.error('Error updating offer in the listing:', error);
    return res.status(500).json({ error: 'Failed to update offer in the listing' });
  }
};

// Delete an offer from a listing by ID
export const deleteOfferFromListing = async (req, res) => {
  const { listingId } = req.params;
  const { offerId } = req.body;

  try {
    let listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    listing.AROffer = listing.offers.filter((id) => id !== offerId);
    await listing.save();

    return res.status(200).json({ message: 'Offer deleted from the listing', listing });
  } catch (error) {
    console.error('Error deleting offer from the listing:', error);
    return res.status(500).json({ error: 'Failed to delete offer from the listing' });
  }
};

export const getOffersForListing = async (req, res) => {
  const { listingId } = req.params;

  try {
    // Fetch offers related to the given listing ID
    // Implement your logic to retrieve offers for the specific listing from the database
    // For example:
    const offers = await AROffer.find({ listing: listingId });

    res.status(200).json(offers);
  } catch (error) {
    console.error('Error fetching offers for the listing:', error);
    res.status(500).json({ error: 'Failed to fetch offers for the listing' });
  }
};


export const addOfferToListing = async (req, res) => {
  const { listingId, offerId } = req.params;

  try {
    // Check if the listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if the offer exists
    const offer = await AROffer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    // Add the offer to the listing's offers array
    listing.offers.push(offerId);

    // Save the updated listing
    await listing.save();

    return res.status(200).json({ message: 'Offer added to the listing successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to add offer to the listing', error: error.message });
  }
};



export const getAllOwners = async (req, res) => {
  try {
    const listings = await Listing.find({ offers: { $ne: [] } }).populate('owner');
    const owners = listings.map((listing) => listing.owner);
    res.json({ owners });
  } catch (error) {
    console.error('Error retrieving owners:', error);
    res.status(500).json({ error: 'Failed to retrieve owners' });
  }
};

export const getAllUserRefs = async (req, res) => {
  try {
    const listings = await Listing.find().distinct('userRef');
    res.json({ userRefs: listings });
  } catch (error) {
    console.error('Error retrieving userRefs:', error);
    res.status(500).json({ error: 'Failed to retrieve userRefs' });
  }
};

export const getAllUserRefswithOffers = async (req, res) => {
  try {
    const listings = await Listing.find({ 'offers.0': { $exists: true } }).distinct('userRef');
    res.json({ userRefs: listings });
  } catch (error) {
    console.error('Error retrieving userRefs:', error);
    res.status(500).json({ error: 'Failed to retrieve userRefs' });
  }
};